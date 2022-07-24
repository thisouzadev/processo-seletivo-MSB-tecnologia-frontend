import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
function AllRegister() {
  const [registers, setRegisters] = useState([]); // array de registros

  useEffect(() => {
    const getRegisterData = async () => {
      const { data } = await axios.get("http://localhost:3000/user");
      console.log(data);
      setRegisters(data);
    };
    const interval = setInterval(() => {
      getRegisterData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (registers.length === 0) {
    return <div>Nenhum registro encontrado</div>;
  }
  if (registers.length > 0) {
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {Object.keys(registers[0]).map((title, index) => (
              <th scope="col" key={ index }>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            registers.map((register, index) => (
              <tr scope="row" key={ index }>
                {Object.values(register).map((value, index) => (
                  <td key={index}>
                    {value}
                  </td>
                ))}
              </tr>
            ))
          }
        </tbody>
      </Table>
    );
  }
}

export default AllRegister;
