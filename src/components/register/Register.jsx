import React, { useRef, useState } from "react";
import "react-phone-number-input/style.css";
// import Error from "../../components/Error";
import "./register.css";
import AllRegister from "../allRegister/AllRegister";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { Container, Form, Button } from "react-bootstrap";

function Register () {
  const form = useRef();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [validTelefone, setValidTelefone] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [validFile, setValidFile] = useState(false); // validar arquivo
  // const [error, setError] = useState(false);
  // const [messageError, setMessageError] = useState("");

  const sendEmail = (e) => {
    emailjs.sendForm("gmailMessage", "template_zuupgnk", form.current, "user_cuGdalc3wsdlPAEKEvtGg")
      .then((result) => {
        alert("Mensagem enviada com sucesso! :D");
        console.log(result.text);
      }, (error) => {
        alert(error.message);
        console.log(error.text);
      });
    e.target.reset();
  };
  const handleButton = async (event) => {
    event.preventDefault();
    sendEmail(event);
    const data = new FormData();
    data.append("nome", nome);
    data.append("email", email);
    data.append("telefone", telefone);
    data.append("mensagem", mensagem);
    data.append("file", selectedFile);
    await axios.post("http://localhost:3000/register", data);
  };
  // const setErrorMessage = (message) => {
  //   setError(true);
  //   setMessageError(message);
  // };

  const getValidateEmail = ({ target: { value } }) => {
    const validaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (validaEmail.test(value)) {
      setValidEmail(true);
      // setErrorMessage("entre com um email valido ");
    } else {
      // setError(validEmail);
      setValidEmail(false);
    }
    setEmail(value);
  };

  const getValidateTelefone = ({ target: { value } }) => {
    const validaTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;
    if (validaTelefone.test(value)) {
      setValidTelefone(true);
      // setErrorMessage("entre com um telefone valido");
    } else {
      // setError(validTelefone);
      setValidTelefone(false);
    }
    setTelefone(value);
  };

  const getValidateFile = (event) => {
    const validaFile = /^(([a-zA-Z]:)|(\\{2}\w+)\$?)(\\(\w[\w].*))(.txt|.TXT|.odt|.ODT|.docx|.DOCX|.doc|.DOC|.pdf|.PDF)$/;
    if (validaFile.test(event.target.value)) {
      setValidFile(true);
      // setErrorMessage("entre com um arquivo valido");
    } else {
      // setError(validFile);
      setValidFile(false);
    }
    setSelectedFile(event.target.files[0]);
  };

  const submit = () => {
    if (validEmail && validTelefone && validFile) return false;
    return true;
  };

  return (
    <Container className='mt-5 p-2'>
      <Form ref={form} onSubmit={handleButton} className='register' method="post" encType='multipart/form-data'>
        <Form.Group controlId="nome" className="mb-3">
          <Form.Label>
        Nome:
            <Form.Control type="text" value={nome} onChange={ (event) => setNome(event.target.value)} name="Nome" />
          </Form.Label>

        </Form.Group>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>
        email:
            <Form.Control type="email" value={email} onChange={ (event) => getValidateEmail(event)} name="email" />
          </Form.Label>

        </Form.Group>
        <Form.Group controlId="telefone" className="mb-3">
          <Form.Label>
      telefone:
            <Form.Control type="text" value={telefone} onChange={ (event) => getValidateTelefone(event)} name="telefone" />
          </Form.Label>

        </Form.Group>
        <Form.Group controlId="mensagem" className="mb-3">
          <Form.Label>
        mensagem:
            <Form.Control type="text" value={mensagem} onChange={ (event) => setMensagem(event.target.value)} name="mensagem" />
          </Form.Label>

        </Form.Group>
        <Form.Group controlId="file" className="mb-3">
          <Form.Label>
        arquivo:
            <Form.Control type="file" onChange={ (event) => getValidateFile(event)}/>
          </Form.Label>

        </Form.Group>
        <Form.Group controlId="submit" className="mb-3">
          <Button
            type="submit"
            disabled={submit()}
          >
            criar
          </Button>
        </Form.Group>
        {/* {error
          ? (
            <Error
              message={messageError}
            />
          )
          : (
            ""
          )} */}
      </Form>
      <AllRegister />
    </Container>
  );
}

export default Register;
