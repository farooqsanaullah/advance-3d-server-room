import { Canvas } from "react-three-fiber";
import React, { useState } from 'react';
import CreateFloor from './components/CreateFloor';
import CreateRack from './components/CreateRack';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import './App.css';
import './index.css'
import GroundFloor from './components/GroundFloor';
import DisplayTotalRack from './components/DisplayTotalRack';
import { OrbitControls, } from 'drei';
import * as THREE from 'three'
function App() {


  //*****************************************************************************************************
  //                   Create Room   start 
  //*****************************************************************************************************
  const [roomColor, setRoomColor] = useState('');
  const [roomHeight, setRoomHeight] = useState(0);
  const [roomWidth, setRoomWidth] = useState(0);
  const [roomLength, setRoomLength] = useState(0);

  const [roomParameter, setRoomParameter] = useState({
    height: 0,
    width: 0,
    length: 0,
    color: '#D3D3D3'
  })

  const handleCreateRoom = (event) => {

    setRoomParameter({ ...roomParameter, [event.target.name]: event.target.value })
  }

  const handleSubmitCreateRoom = (event) => {
    let heightInMeter = (roomParameter.height * 0.3048);
    let widthInMeter = (roomParameter.width * 0.3048);
    let lengthInMeter = (roomParameter.length * 0.3048);
    setRoomHeight(heightInMeter);
    setRoomWidth(widthInMeter);
    setRoomLength(lengthInMeter);
    setRoomColor(roomParameter.color)
    event.preventDefault();
  }



  //*****************************************************************************************************
  //                   Create Room   end 
  //*****************************************************************************************************


  //*****************************************************************************************************
  //                   Create Rack   start 
  //*****************************************************************************************************

  const emptyRack = {
    id: '',
    height: 0,
    color: '#ADD8E6',
    x_axis: 0,
    y_axis: 0,
    rack_name: '',
    angle_rack: 0,
  };

  const emptyUpdateRack = {
    id: '',
    height: 0,
    color: '',
    x_axis: 0,
    y_axis: 0,
    rack_name: '',
    angle_rack: 0,
    height_feet: 0
  };

  const [rackParameter, setRackParameter] = useState(emptyRack);
  const [rackUpdateParameter, setRackUpdateParameter] = useState(emptyUpdateRack);
  const [totalRack, setTotalRack] = useState([]);

  const [rackColor, setRackColor] = useState('');
  const [rackHeight, setRackHeight] = useState(0);
  const [rackWidth, setRackWidth] = useState(0);
  const [rackLength, setRackLength] = useState(0);
  const [rackXaixs, setRackXaixs] = useState(0);
  const [rackYaixs, setRackYaixs] = useState(0);
  const [rackAngle, setRackAngle] = useState(0);
  const standardRackWidth = 1.0668;
  const standardRackLength = 0.6096;


  const handleCreateRack = (event) => {
    setRackParameter({ ...rackParameter, [event.target.name]: event.target.value })
  }

  const handleUpdateRack = (event) => {
    setRackUpdateParameter({ ...rackUpdateParameter, [event.target.name]: event.target.value })
  }

  const setStateOfRack = (paramerter) => {
    let heightInMeter = (paramerter.height * 0.04445);
    setRackHeight(heightInMeter);
    setRackWidth(standardRackWidth);
    setRackLength(standardRackLength);
    setRackColor(paramerter.color)
    setRackXaixs(paramerter.x_axis);
    setRackYaixs(paramerter.y_axis);
    setRackAngle(paramerter.angle_rack);

  }

  const handleSubmitCreateRack = (event) => {
    setStateOfRack(rackParameter);
    event.preventDefault();
    addRack();

  }
  const handleSubmitUpdateRack = (event) => {
    rackUpdateParameter.height = rackUpdateParameter.height_feet;
    setStateOfRack(rackUpdateParameter);
    console.log(rackUpdateParameter)
    event.preventDefault();
    updateRack();

  }

  //*****************************************************************************************************
  //                   Create Rack   end 
  //*****************************************************************************************************

  //*****************************************************************************************************
  //                   Create Rack  or create Room select  start 
  //*****************************************************************************************************


  const [form, setForm] = useState("default");
  const [updateForm, setUpdateForm] = useState("default");



  const onCreateSelete = (data) => {
    let request = data;
    if (request != "default") {
      setUpdateForm("default");
    }
    setForm(request);
  }




  //*****************************************************************************************************
  //                   Create Rack  or create Room select  end 
  //*****************************************************************************************************



  //*****************************************************************************************************
  //                   Total Rack  start 
  //*****************************************************************************************************



  const addRack = () => {
    const id = "RK-0" + totalRack.length;
    let heightInMeter = (rackParameter.height * 0.04445);  //0.04445 standard 1 unit height 
    if (rackParameter.height >= 1) {
      const paramaterOfRack =
      {
        id: id,
        height: heightInMeter,
        width: standardRackWidth,
        length: standardRackLength,
        x_axis: rackParameter.x_axis,
        y_axis: rackParameter.y_axis,
        color: rackParameter.color,
        angle_rack: rackParameter.angle_rack,
        rack_name: rackParameter.rack_name
      }
      setTotalRack(totalRack => [...totalRack, paramaterOfRack]);
      setRackParameter(emptyRack)

      console.log(totalRack);
    }
  }

  //*****************************************************************************************************
  //                   Total Rack  end 
  //*****************************************************************************************************

  //*****************************************************************************************************
  //                   Update & Delete Rack  start 
  //*****************************************************************************************************



  const updateRack = () => {

    const objIndex = totalRack.findIndex((obj => obj.id == rackUpdateParameter.id));

    rackUpdateParameter.height = (rackUpdateParameter.height_feet * 0.04445);

    delete rackUpdateParameter['height_feet'];
    console.log(rackUpdateParameter)
    totalRack[objIndex] = rackUpdateParameter;
    setUpdateForm("default");

  }
  const deleteRack = (id) => {

    if (window.confirm("Are you sure to delete")) {
      const objIndex = totalRack.findIndex((obj => obj.id == id));
      totalRack.splice(objIndex, 1);
      if (totalRack.length == 0) {
        setRackHeight(0);
        setRackWidth(0);
        setRackLength(0);
        setRackColor('')
        setRackXaixs(0);
        setRackYaixs(0);
        setRackAngle(0);
      }
      console.log(objIndex);
      setUpdateForm("default");
    }

  }
  //*****************************************************************************************************
  //                   Update & Delete Rack  end 
  //*****************************************************************************************************

  const handleOptionUpdateRack = (rackId) => {
    setForm("default");
    setUpdateForm("update_rack");
    const result = totalRack.find(({ id }) => id === rackId);
    result['height_feet'] = result.height / 0.04445;
    setRackUpdateParameter(result);




  }

  function onGreet() {
    console.log("click the function");
  }




  return (

    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">
          <div className="icon__options">
            <i onClick={onCreateSelete.bind(this, "create_room")} className="fa fa-building" data-toggle="tooltip" data-placement="left" title="Create Room"></i>
            <i onClick={onCreateSelete.bind(this, "create_rack")} className="fa fa-square" data-toggle="tooltip" data-placement="left" title="Create Rack"></i>
            {/* <i className="fa fa-thermometer-three-quarters" data-toggle="tooltip" data-placement="left" title="Check Temparetrue"></i> */}
          </div>
          {/* <div className="form-group options">
            <select className="form-control" value={form} onChange={onCreateSelete}>
              <option value="default">Default select</option>
              <option value="create_room">Create Room</option>
              <option value="create_rack">Create Rack </option>
              
            </select>
          </div> */}
          {form == 'create_room' && (<div className="App create_from" >
            <div><h3>Create Room</h3></div>
            <form onSubmit={handleSubmitCreateRoom} id="creatRoom">
              <div className="form-group">
                <label >Enter Height of room (Feet)</label>
                <input type="number" name="height" className="form-control" placeholder="Height" value={roomParameter.height} onChange={handleCreateRoom} />
              </div>

              <div className="form-group">
                <label >Enter Width of room (Feet)</label>
                <input type="number" name="width" className="form-control" placeholder="Width" value={roomParameter.width} onChange={handleCreateRoom} />
              </div>
              <div className="form-group">
                <label >Enter Length of room (Feet)</label>
                <input type="number" name="length" className="form-control" placeholder="Length" value={roomParameter.length} onChange={handleCreateRoom} />
              </div>
              <div className="form-group">
                <label >Pick Color of room </label>
                <input type="color" name="color" className="form-control" placeholder="Color Name" value={roomParameter.color} onChange={handleCreateRoom} />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>

          </div>)}
          {form == 'create_rack' && (<div className="App create_from">
            <div><h3>Create Rack</h3></div>
            <form onSubmit={handleSubmitCreateRack} id="creatRack">
              <div className="form-group">
                <label >Rack Name</label>
                <input type="text" name="rack_name" required className="form-control" placeholder="Enter name" value={rackParameter.rack_name} onChange={handleCreateRack} />
              </div>

              <div className="form-group">
                <label >Standard Unit (1 to 42)</label>
                <input type="number" name="height" className="form-control" placeholder="Enter Unit(u)" min="1" max="42" value={rackParameter.height} onChange={handleCreateRack} />
              </div>


              <div className="form-group">
                <label >Move on X-axis</label>
                <input type="number" name="x_axis" className="form-control" placeholder="Move on x-axis" step="0.001" value={rackParameter.x_axis} onChange={handleCreateRack} />
              </div>

              <div className="form-group">
                <label >Move on Y-axis</label>
                <input type="number" name="y_axis" className="form-control" placeholder="Move on y-axis" step="0.001" value={rackParameter.y_axis} onChange={handleCreateRack} />
              </div>

              <div className="form-group">
                <label >Angle of Rack</label>
                <input type="number" min="0" max="360" name="angle_rack" className="form-control" placeholder="Angle Rack" value={rackParameter.angle_rack} onChange={handleCreateRack} />
              </div>

              <div className="form-group">
                <label >Pick Color of rack </label>
                <input type="color" name="color" className="form-control" placeholder="Color Name" value={rackParameter.color} onChange={handleCreateRack} />
              </div>
              <button type="submit" className="btn btn-primary">Create Rack</button>
            </form>

          </div>)}
          {updateForm == 'update_rack' && (<div className="App create_from">
            <div><h3>Update Rack</h3></div>
            <form onSubmit={handleSubmitUpdateRack} id="updateRack">


              <div className="form-group">
                <label >Rack Name</label>
                <input type="text" name="rack_name" className="form-control" required placeholder="Enter name" value={rackUpdateParameter.rack_name} onChange={handleUpdateRack} />
              </div>

              <div className="form-group">
                <label >Standard Unit (1 to 42)</label>
                <input type="number" name="height_feet" className="form-control" placeholder="Enter Unit(u)" min="1" max="42" value={rackUpdateParameter.height_feet} onChange={handleUpdateRack} />
              </div>


              <div className="form-group">
                <label >Move on X-axis</label>
                <input type="number" name="x_axis" className="form-control" placeholder="Move on x-axis" step="0.001" value={rackUpdateParameter.x_axis} onChange={handleUpdateRack} />
              </div>

              <div className="form-group">
                <label >Move on Y-axis</label>
                <input type="number" name="y_axis" className="form-control" placeholder="Move on y-axis" step="0.001" value={rackUpdateParameter.y_axis} onChange={handleUpdateRack} />
              </div>

              <div className="form-group">
                <label >Angle of Rack</label>
                <input type="number" min="0" max="360" name="angle_rack" className="form-control" placeholder="Angle Rack" value={rackUpdateParameter.angle_rack} onChange={handleUpdateRack} />
              </div>

              <div className="form-group">
                <label >Pick Color of rack </label>
                <input type="color" name="color" className="form-control" placeholder="Color Name" value={rackUpdateParameter.color} onChange={handleUpdateRack} />
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
              <button type="button" onClick={deleteRack.bind(this, rackUpdateParameter.id)} className="btn btn-danger delete__button">Delete</button>
            </form>

          </div>)}

        </div>
        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
          <Canvas className="canvas" shadowMap colorManagement camera={{ position: [-10, 50, 150], fov: 80 }} >
            <ambientLight intensity={0.3} />
            <directionalLight

              intensity={.3}
              position={[10, 15, 10]}

            />


            {/*************************************************************Create Room Start *********************************************************************/}

            <group scale={[roomWidth, roomHeight, roomLength]} >
              <group>
                <CreateFloor position={[0, 0, 0]} color={roomColor} scale={[10, 1, 10]} />
                <CreateFloor position={[0, 5.5, -4.85]} color={roomColor} scale={[9.4, 10, .3]} />
                <CreateFloor position={[4.85, 5.5, 0]} color={roomColor} scale={[.3, 10, 10]} />
                <CreateFloor position={[-4.85, 5.5, 0]} color={roomColor} scale={[.3, 10, 10]} />
              </group>
            </group>

            {/*************************************************************Create Room End *********************************************************************/}

            {/* rotation={[0, THREE.Math.degToRad(rackAngle), 0]} position={[rackXaixs, -1.5, rackYaixs]  scale={[rackWidth, rackHeight, rackLength]} */}


            {/*************************************************************Create Rack Start*********************************************************************/}
            <group rotation={[0, THREE.Math.degToRad(rackAngle), 0]} position={[rackXaixs, 1.5, rackYaixs]} scale={[rackWidth, rackHeight, rackLength]}>
              <CreateRack position={[0, 10.5, 0]} color={rackColor} scale={[10, .3, 10]} />
              <CreateRack position={[0, 0.5, 0]} color={rackColor} scale={[10, 1, 10]} />
              <CreateRack position={[0, 5.5, -4.85]} color={rackColor} scale={[10, 10, .3]} />
              <CreateRack position={[4.85, 5.5, 0]} color={rackColor} scale={[.3, 10, 10]} />
              <CreateRack position={[-4.85, 5.5, 0]} color={rackColor} scale={[.3, 10, 10]} />
            </group>


            {/*************************************************************Create Rack End*********************************************************************/}


            {/*************************************************************Display All Rack Start*********************************************************************/}

            {totalRack.length > 0 && totalRack.map((item) => (<DisplayTotalRack paramaters={item} greet={onGreet.bind(this)} />))}


            {/*************************************************************Display All Rack End*********************************************************************/}





            {/* <CreateFloor position={[0,10,0]} color='red' speed={6} rotation={[THREE.Math.degToRad(90), 0, 0]} scale={[roomWidth,roomHeight, 1]} />  */}
            {/* <GroundFloor scale={[basicWidth, basicLength,1 ]} color={'#D3D2D3'} /> */}
            <OrbitControls />
          </Canvas>
        </div>

        <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">
          <div className="options">
            {totalRack.length >= 1 &&
              (

                <div className="form__update_rack">
                  <h3>Rack List</h3>
                  <div className="form-group"  >
                    {totalRack.map((item) => (<button className="btn btn-primary btn-rack" onClick={handleOptionUpdateRack.bind(this, item.id)}>{item.id} - {item.rack_name}</button>))}
                  </div></div>)
            }
          </div>

        </div>
      </div>
    </div>



  );
}

export default App;
