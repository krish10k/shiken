import axios from "axios";
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { baseURL, submitExamForm } from "../../context/actions";
import { Context } from "../../context/context";
import { DecryptObjectData } from "../../utils/Hash/Hash";
import "./form.css";

let Electives_1 = ["IP", "ADBMS", "EL"];
let Electives_2 = [
  "Data Analytics",
  "Communication Network",
  "Natural Language Processing",
];

let Year = ["FE", "SE", "TE", "BE"];

export default function Veriform() {
  const { state, dispatch } = useContext(Context);
  const [electiveList, setElectiveList] = useState([]);

  const userData = DecryptObjectData(localStorage.getItem("DATA"));
  console.log("form usdada", userData);

  const [student, setStudent] = useState({
    Email: userData?.student?.Email ?? "",
    First_Name: userData?.student?.First_Name ?? "",
    Father_Name: userData?.student?.Father_Name ?? "",
    Mother_Name: userData?.student?.Mother_Name ?? "",
    Last_Name: userData?.student?.Last_Name ?? "",
    Mobile_No: userData?.student?.Mobile_No ?? "",
    Year: "",
    Department: userData?.student?.Branch,
    Roll_No: userData?.student?.Roll_No ?? "",
    Sem: "",
    Elective: Electives_1[0],
    ILO: Electives_2[0],
  });

  useEffect(() => {
    console.log(student.Last_Name);
  }, [student]);

  const getElectives = async () => {
    let electives = await axios.get(`${baseURL}/getElectives`);
  };

  function handleChange(e) {
    const { value, name } = e.target;
    setStudent((prevValue) => ({ ...prevValue, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    submitExamForm(student, dispatch);
    console.log(student);
  };

  return (
    <div className="bg">
      <div className="mbody">
        <h2>
          <b>Exam Form </b>
        </h2>

        <Form onSubmit={handleSubmit}>
          <fieldset className="sec">
            {/* <legend className="w-auto p-1">
              <b>Students Details</b>
            </legend> */}
            <br />

            <Row>
              <Form.Label column lg={2} sm={12}>
                Email-ID:
              </Form.Label>
              <Col lg={4} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="example@mail.com"
                  name="Email"
                  value={student.Email}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                First Name:
              </Form.Label>
              <Col lg={4} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="First_Name"
                  value={student.First_Name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                Father Name:
              </Form.Label>
              <Col lg={4} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Father Name"
                  name="Father_Name"
                  value={student.Father_Name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                Last Name:
              </Form.Label>
              <Col lg={4} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="Last_Name"
                  value={student.Last_Name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                Mother Name:
              </Form.Label>
              <Col lg={4} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Mother Name"
                  name="Mother_Name"
                  value={student.Mother_Name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                Mobile Number:
              </Form.Label>
              <Col lg={4} sm={12}>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  name="Mobile_No"
                  value={student.Mobile_No}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                Year:
              </Form.Label>
              <Col lg={4} sm={12}>
                {/* <Form.Control
                  type="text"
                  placeholder="FE/SE/TE/BE"
                  name="Year"
                  value={student.Year}
                  onChange={handleChange}
                  required
                /> */}
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="Year"
                  onChange={handleChange}
                  required
                >
                  {Year.map((item, key) => (
                    <option value={item} key={key}>
                      {item}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                Department:
              </Form.Label>
              <Col lg={4} sm={12}>
                <Form.Control
                  as="select"
                  className="form-select"
                  name="Department"
                  placeholder="CE/IT/EXTC"
                  value={student.Department}
                  onChange={handleChange}
                  required
                >
                  <option disabled>Select Department</option>
                  <option value="comps">CE</option>
                  <option value="IT">IT</option>
                  <option value="ENTC">ENTC</option>
                  <option value="ELE">Electronics</option>
                </Form.Control>
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                Roll No.:
              </Form.Label>
              <Col lg={4} sm={12}>
                <Form.Control
                  type="text"
                  readOnly
                  placeholder="Roll Number"
                  name="Roll_No"
                  value={student.Roll_No}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                Semester:
              </Form.Label>
              <Col lg={4} sm={12}>
                <Form.Control
                  as="select"
                  className="form-select"
                  name="Sem"
                  value={student.Sem}
                  onChange={handleChange}
                  required
                >
                  <option disabled>Select Sem</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </Form.Control>
              </Col>
            </Row>

            <Row>
              <Form.Label column lg={2} sm={12}>
                {student.Year === "BE" ? "Elective 1" : "Elective"}
              </Form.Label>
              <Col lg={4} sm={12} required>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="Elective"
                  onChange={handleChange}
                  required
                >
                  {Electives_1.map((item, key) => (
                    <option value={item} key={key}>
                      {item}
                    </option>
                  ))}
                </select>
              </Col>
            </Row>

            {student.Year === "BE" ? (
              <Row>
                <Form.Label column lg={2} sm={12}>
                  ILO
                </Form.Label>
                <Col lg={4} sm={12}>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    name="ILO"
                    onChange={handleChange}
                    required
                  >
                    {Electives_2.map((item, key) => (
                      <option value={item} key={key}>
                        {item}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            ) : (
              <></>
            )}

            <Button className="m-3" variant="danger" type="submit">
              Submit
            </Button>
          </fieldset>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

// import { useState } from "react";
// import { Row, Col, Form, Button } from "react-bootstrap";
// import { Submit_Examform, baseURL } from "../../api/api";
// import "./form.css";

// let Electives = ["IP", "ADBMS", "EL"];

// export default function RegularForm() {
//   const [Email, setEmail] = useState("");
//   const [First_Name, setName] = useState("");
//   const [Father_Name, setFname] = useState("");
//   const [Mother_Name, setMname] = useState("");
//   const [Last_Name, setLname] = useState("");
//   const [Mobile_No, setMobile] = useState("");
//   const [Year, setYear] = useState("");
//   const [Department, setDepartment] = useState("");
//   const [Roll_No, setRoll] = useState("");
//   const [Sem, setSem] = useState(5);
//   const [Elective, setElective] = useState(Electives[0]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const exam_form = {
//       Email,
//       First_Name,
//       Father_Name,
//       Mother_Name,
//       Last_Name,
//       Mobile_No,
//       Year,
//       Department,
//       Roll_No,
//       Sem,
//       Elective
//     };
//     console.log(exam_form);
//     Submit_Examform(baseURL +`examForm/submit`, exam_form )

//   };

//   return (
//     <div className="bg">
//       <div className="mbody">
//         <h2>
//           <b>Exam Form </b>
//         </h2>

//         <Form onSubmit={handleSubmit}>
//           <fieldset className="sec">
//             {/* <legend className="w-auto p-1">
//               <b>Students Details</b>
//             </legend> */}
//             <br />

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Email-ID:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="example@mail.com"
//                   value={Email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 First Name:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="Name"
//                   value={First_Name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Father Name:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="Father Name"
//                   value={Father_Name}
//                   onChange={(e) => setFname(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Last Name:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="Last Name"
//                   value={Last_Name}
//                   onChange={(e) => setLname(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Mother Name:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="Mother Name"
//                   value={Mother_Name}
//                   onChange={(e) => setMname(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Mobile number:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="8888"
//                   value={Mobile_No}
//                   onChange={(e) => setMobile(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Year:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="TE"
//                   value={Year}
//                   onChange={(e) => setYear(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Department:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="CE"
//                   value={Department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Roll No.:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="1234"
//                   value={Roll_No}
//                   onChange={(e) => setRoll(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Semester:
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <Form.Control
//                   type="text"
//                   placeholder="5"
//                   value={Sem}
//                   onChange={(e) => setSem(e.target.value)}
//                 />
//               </Col>
//             </Row>

//             <Row>
//               <Form.Label column lg={2} sm={12}>
//                 Elective
//               </Form.Label>
//               <Col lg={4} sm={12}>
//                 <select
//                   className="form-select"
//                   aria-label="Default select example"
//                   onChange={(e) => setElective(e.target.value)}
//                 >
//                   {Electives.map((item) => (
//                     <option value={item} key={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </Col>
//             </Row>
//             <Button className="m-3" variant="danger" type="submit">
//               Submit
//             </Button>
//           </fieldset>
//         </Form>
//       </div>
//     </div>
//   );
// }
