import React from "react";
import styled from "styled-components";
import { defaultTheme } from "../defaultTheme";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Helmet } from "react-helmet";
import axios from "axios";

const AdminPanel = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ingredients: "",
    descriptions: "",
    mainImage: "",
    secondaryImage: "",
    tertiaryImage: "",
    courseType: "მთავარი კერძი",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;
    setFormData({
      ...formData,
      [name]: file,
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      price: "",
      ingredients: "",
      descriptions: "",
      mainImage: "",
      secondaryImage: "",
      tertiaryImage: "",
      courseType: "",
    });
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.name.trim() === "" ||
      formData.price.trim() === "" ||
      formData.ingredients.trim() === "" ||
      formData.descriptions.trim() === "" ||
      formData.courseType.trim() === ""
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!formData.mainImage && !formData.secondaryImage && !formData.tertiaryImage) {
      toast.error("Please upload all three image");
      return;
    }

    const Data = new FormData();
    Data.append("name", formData.name || "");
    Data.append("price", formData.price.toString()); // Convert number to string
    Data.append("ingredients", formData.ingredients || "");
    Data.append("descriptions", formData.descriptions || "");
    Data.append("courseType", formData.courseType || "");

    if (formData.mainImage) {
      Data.append("mainImage", formData.mainImage);
    }
    if (formData.secondaryImage) {
      Data.append("secondaryImage", formData.secondaryImage);
    }
    if (formData.tertiaryImage) {
      Data.append("tertiaryImage", formData.tertiaryImage);
    }

    try {
      const response = await axios.post("http://localhost:5000/add-item", Data);
      const data = response.data;
      console.log(data);

      handleReset();
      toast.success("Item added Successfully");
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error(`There is some problem`);
    }
  };

  return (
    <div>
      <ToastContainer />
      {/* Helmet for SEO */}
      <Helmet>
        <title>ადმინ პანელი</title>
        <meta name="description" content="Your meta description goes here." />
        <link rel="canonical" href="https://www.yourwebsite.com/main" />
        <meta property="og:title" content="Your Page Title" />
        <meta property="og:description" content="Your meta description goes here." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.yourwebsite.com/main" />
        <meta property="og:image" content="https://www.yourwebsite.com/og-image.jpg" />
      </Helmet>

      <div>
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
            <h1>დაამატეთ კერძები</h1>
            <div>
              <NamePrice>
                <WidthDiv>
                  <p>კერძის სახელი</p>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </WidthDiv>
                <WidthDiv>
                  <p>კერძის ფასი</p>
                  <Input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </WidthDiv>
              </NamePrice>
              <Descriptions>
                <WidthDiv>
                  <p>კერძის ინგრედიენტები</p>
                  <Input
                    type="text"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleInputChange}
                  />
                </WidthDiv>
                <WidthDiv>
                  <p>აღწერა</p>
                  <textarea
                    name="descriptions"
                    value={formData.descriptions}
                    onChange={handleTextareaChange}
                  ></textarea>
                </WidthDiv>
              </Descriptions>
              <Select>
                <p>აირჩიეთ კერძის სახეობა</p>
                <select name="courseType" value={formData.courseType} onChange={handleInputChange}>
                  <option value="მთავარი კერძი">მთავარი კერძი</option>
                  <option value="სტარტერი">სტარტერი</option>
                  <option value="დესერტი">დესერტი</option>
                  <option value="კოკტეილი">კოკტეილი</option>
                </select>
              </Select>
              <ImagesDiv>
                <div>
                  <p>დაამატეთ მთავარი სურათი</p>
                  <input type="file" name="mainImage" onChange={handleFileChange} />
                </div>
                <div>
                  <p>დააამატეთ მეორე სურათ</p>
                  <input type="file" name="secondaryImage" onChange={handleFileChange} />
                </div>
                <div>
                  <p>დაამატეთ მესამე სურათი</p>
                  <input type="file" name="tertiaryImage" onChange={handleFileChange} />
                </div>
              </ImagesDiv>
            </div>
            <ButtonDiv>
              <button>დამატება</button>
            </ButtonDiv>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default AdminPanel;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 100px;
  margin-top: 150px;
  @media (max-width: 1150px) {
    padding: 30px 50px;
  }
  h1 {
    font-size: 35px;
    font-weight: 700;
    line-height: 41px;
    color: ${defaultTheme.colors.red};
    padding-bottom: 10px;
    border-bottom: 2px solid ${defaultTheme.colors.red};
    margin-bottom: 20px;
  }
  p {
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    color: ${defaultTheme.colors.red};
    margin-bottom: 5px;
  }
`;
const Input = styled.input`
  width: 500px;
  height: 50px;
  font-size: 25px;
  font-weight: 400;
  line-height: 29px;
  padding-left: 15px;
  border: 2px solid ${defaultTheme.colors.red};
  border-radius: 10px;
  background-color: ${defaultTheme.colors.floralwhite};
  color: ${defaultTheme.colors.blue};
  &:focus {
    outline: none;
  }
  /* Remove spinners for number inputs */
  -moz-appearance: textfield;
  appearance: textfield;

  /* Webkit browsers like Chrome and Safari */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const WidthDiv = styled.div`
  width: 100%;
  p {
    margin-top: 8px;
  }
`;
const Form = styled.form`
  width: 100%;
`;

const NamePrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* flex-wrap: wrap; */
  margin-bottom: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const Descriptions = styled.div`
  display: flex;
  align-items: top;
  justify-content: space-between;

  textarea {
    width: 500px;
    height: 150px;
    font-size: 18px;
    font-weight: 400;
    line-height: 21px;
    padding: 10px;
    border: 0;
    border: 2px solid ${defaultTheme.colors.red};
    border-radius: 10px;
    background-color: ${defaultTheme.colors.floralwhite};
    color: ${defaultTheme.colors.blue};
    resize: vertical;
    &:focus {
      outline: none;
    }
    @media (max-width: 1000px) {
      width: 100%;
    }
  }
  @media (max-width: 1000px) {
    flex-direction: column;
    width: 100%;
  }
`;
const ImagesDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
`;

const Select = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 20px 0;
  @media (max-width: 500px) {
    flex-direction: column;
  }
  p {
    margin-right: 10px;
  }
  select {
    /* width: 100px; */
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    color: ${defaultTheme.colors.blue};
    margin-bottom: 5px;
    background-color: ${defaultTheme.colors.lightred};
    &:focus {
      outline: none;
    }
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  button {
    cursor: pointer;
    font-size: 25px;
    font-weight: 400;
    line-height: 29px;
    background-color: ${defaultTheme.colors.red};
    color: ${defaultTheme.colors.floralwhite};
    border: 0;
    border-radius: 10px;
    padding: 10px 15px;
  }
`;
