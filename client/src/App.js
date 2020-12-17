import React,{useState} from 'react';
import Axios from 'axios';


function App() {

  const[name,setName]=useState("");
  const[age,setAge]=useState(0);
  const[country,setCountry]=useState("");
  const[position,setPosition]=useState("");
  const[wage,setWage]=useState(0);
  const[newwage,setNewWage]=useState(0);
  const[show,setShow]=useState(false);
  /*
  สิ่งที่ getEmployees ทำ
  Axios request รับค่าจาก http://localhost:3001/employees แล้วใส่ข้อมูล respond ลงไป ด้านในคือ respond.data หรือ req.body
  ใส่ลงไปใน setEmployeeList
  */
  const [employeeList, setEmployeeList] =useState([]);
  const getEmployees =()=>{
    Axios.get("http://localhost:3001/employees").then((response)=>{
        setEmployeeList(response.data);
        setShow(!show);  
      }  
    );
  };

/*
  สิ่งที่ addEmployee ทำ
  Axios request ส่งค่าไป http://localhost:3001/employees โดนมีข้อมูลคือจาก state ที่รับมาจาก event.target.value ของฟอร์ม
  หลังจากนั้น setEmployeeList เพิ่มข้อมูลไปยัง employeeList โดย...spread operator เพื่อก๊อปปี้ข้อมูลเดิมก่อน แล้วแทรกข้อมูลใหม่ลงไป
  let arrC = [1, 2, 3];
  let arrD = [4, 5, 6];
  arrC = [...arrC, ...arrD]; //ผลลัพธ์ ==> [1, 2, 3, 4, 5, 6]
  ในที่นี้[...employeeList,{name: name,age: age,country: country,position: position,wage: wage,},]
  =[ค่าเดิม,ค่าใหม่]
  */
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        }
      ]);
    });
  };
/*
สิ่งที่ updateEmployeeWage ทำ
Axios request updateค่าไปที่ http://localhost:3001/employees ค่าที่ส่งคือ wage: newwage(val.wage ที่ถูกดึงจาก event.target.value ของ input), 
id: id(ส่งมาจาก input val.id)
*/ 
  const updateEmployeeWage=(id)=>{
    if (window.confirm("Are you sure")){
    Axios.put("http://localhost:3001/updateWage", {
      wage: newwage,
      id: id
    }).then((response)=>{
      setEmployeeList(
        employeeList.map((val)=>{
          return val.id === id ? {
            id:val.id,
            name:val.name,
            age:val.age,
            country:val.country,
            position:val.position,
            wage:newwage
          }:val;
        })
      );
    });
  }};

  const deleteEmployee=(id)=>{
    if (window.confirm("Delete the item?")) {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
      setEmployeeList(
        employeeList.filter((val)=>{
          return val.id!==id;
        })
      );
    });
  }};
  return (
    <div className="App container">
      <h1 className="mt-3" style={{textAlign:"center"}}>Employee Information</h1>
      <div className="information">
        <form >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name :</label>
            <input type="text" className="form-control" placeholder="Enter name" required 
            onChange={(event)=>{
              setName(event.target.value)
            }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age :</label>
            <input type="number" className="form-control" placeholder="Enter age" required 
            onChange={(event)=>{
              setAge(event.target.value)
            }}/>
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">Country :</label>
            <input type="text" className="form-control" placeholder="Enter country" required 
            onChange={(event)=>{
              setCountry(event.target.value)
            }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">Position :</label>
            <input type="text" className="form-control" placeholder="Enter position" required  
            onChange={(event)=>{
              setPosition(event.target.value)
            }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="wage" className="form-label">Wage :</label>
            <input type="number" className="form-control" placeholder="Enter wage" required 
            onChange={(event)=>{
              setWage(event.target.value)
            }}
            />
          </div>
          <button type="submit" className="btn btn-success" onClick={addEmployee} 
          disabled={!name || !age || !country || !position || !wage}
          >Add Employee</button>
        </form>
        <hr/>
        <div className="employee">
          <button className="btn btn-primary mb-2" onClick={getEmployees}>Show employee</button>
          
          {employeeList.map((val, key )=>{
            console.log(show)
            const showStyle = {
              display:"block" 
            };

            const hideStyle = {
              display:"none" 
            };
            
            return(
            <div className="containner" style={show?showStyle:hideStyle} key={key}>
            <div className="employee card" >
              <div className="card-body text-left">
                <p className="card-text">Name :{val.name}</p>
                <p className="card-text">Age :{val.age}</p>
                <p className="card-text">Country :{val.country}</p>
                <p className="card-text">Position :{val.position}</p>
                <p className="card-text">Wage :{val.wage}</p>
                <div className="d-flex">
                  <input type ="number" 
                  placeholder="0" 
                  className="form-control" 
                  style={{width:"300px"}} 
                  onChange={(event)=>{
                    setNewWage(event.target.value);
                  }}
                  />
                  <button className="btn btn-warning m-1" onClick={()=>{updateEmployeeWage(val.id)}}>Update</button>
                  <button className="btn btn-danger m-1" onClick={()=>{deleteEmployee(val.id)}}>Delete</button>
                </div>
              </div>
            </div>
            </div>
            )
          })}
          
        </div>
      </div>
    </div>
  );
}

export default App;
