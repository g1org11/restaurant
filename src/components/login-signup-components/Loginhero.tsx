import styled from "styled-components";
import { defaultTheme } from "../../defaultTheme";
import hero from "../../assets/login/loginhero.png";

const LoginHero = () => {
  return (
    <Container>
      <div>
        <h1>ჩემი ექაუნთი</h1>
      </div>
    </Container>
  );
};
export default LoginHero;
const Container = styled.div`
  width: 100%;
  height: 280px;
  background-image: url(${hero});
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 100px;
  margin-top: 100px;
  h1 {
    font-size: 35px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${defaultTheme.colors.floralwhite};
  }

  @media (max-width: 768px) {
    padding: 0 50px;
    h1 {
      font-size: 30px;
    }
  }
`;
