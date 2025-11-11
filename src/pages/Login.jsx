import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(90deg, #00d2ff, #3a7bd5);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #00d2ff, #3a7bd5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 0.95rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.6rem;
  color: #2c3e50;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.5px;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  color: #2c3e50;

  &:focus {
    outline: none;
    border-color: #00d2ff;
    background: white;
    box-shadow: 0 0 0 4px rgba(0, 210, 255, 0.1);
  }

  &::placeholder {
    color: #aaa;
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1.1rem;
  background: linear-gradient(135deg, #00c851, #007e33);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 200, 81, 0.4);
    background: linear-gradient(135deg, #00e05c, #009139);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  color: #c62828;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
  border: 2px solid #ef5350;
`;

const InfoBox = styled.div`
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  color: #1565c0;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  border: 2px solid #42a5f5;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ช่องใส่ชื่อผู้ใช้
    if (!username.trim()) {
      setError("กรุณากรอก Username");
      return;
    }

    // ช่องใส่รหัสผ่าน
    if (!password.trim()) {
      setError("กรุณากรอก Password");
      return;
    }

    // ตรวจสอบ username และ password (ตามที่กำหนด)
    if (username === "user" && password === "pass") {
      // บันทึกสถานะการ login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      // ไปหน้า products หรือหน้าหลัก
      navigate("/products");
    } else {
      setError("Username หรือ Password ไม่ถูกต้อง");
    }
  };

  return (
    <LoginPage>
      <LoginCard>
        <Header>
          <Title>เข้าสู่ระบบ</Title>
          <Subtitle>กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบ</Subtitle>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>USER:</Label>
            <InputWrapper>
              <Input
                type="text"
                placeholder="user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>PASS:</Label>
            <InputWrapper>
              <Input
                type="password"
                placeholder="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </InputWrapper>
          </FormGroup>

          <LoginButton type="submit">Login</LoginButton>
        </Form>

        <InfoBox>
          💡 ใช้ username: <strong>user</strong> และ password:{" "}
          <strong>pass</strong>
        </InfoBox>
      </LoginCard>
    </LoginPage>
  );
}

export default Login;
