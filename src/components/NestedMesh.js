import { Canvas, useThree } from "react-three-fiber";
import React, { useState } from 'react';
import CreateFloor from './CreateFloor';
import CreateRack from './CreateRack';
import CreateRoom from './CreateRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import '../App.css';
import '../index.css'
import GroundFloor from './GroundFloor';
import DisplayTotalRack from './DisplayTotalRack';

import { DragControls } from 'three/examples/jsm/controls/DragControls'
import DisplayTotalRoom from './DisplayTotalRoom';
import { OrbitControls, Plane, Sphere } from 'drei';
import * as THREE from 'three';
import { DoubleSide } from "three";
function NestedMesh() {

    //*****************************************************************************************************
    //                   Create Fool start 
    //*****************************************************************************************************


    const meter = 0.3048;
    const [floorColor, setFloorColor] = useState('');
    const [floorWidth, setFloorWidth] = useState(0);
    const [floorLength, setFloorLength] = useState(0);

    const [floorParameter, setFloorParameter] = useState({
        floor_name: '',
        width: 0,
        length: 0,
        color: '#D3D3D3'
    })

    const handleCreateFloor = (event) => {

        setFloorParameter({ ...floorParameter, [event.target.name]: event.target.value })
    }




    const handleSubmitCreateFloor = (event) => {
        let widthInMeter = (floorParameter.width * 0.3048);
        let lengthInMeter = (floorParameter.length * 0.3048);

        setFloorWidth(widthInMeter * 10);
        setFloorLength(lengthInMeter * 10);
        setFloorColor(floorParameter.color)
        event.preventDefault();
        console.log(floorParameter);

        console.log("Floor Width ", widthInMeter, "Floor Length: ", lengthInMeter);

    }



    //*****************************************************************************************************
    //                   Create Room   start 
    //*****************************************************************************************************
    const [roomColor, setRoomColor] = useState('');
    const [roomHeight, setRoomHeight] = useState(0);
    const [roomWidth, setRoomWidth] = useState(0);
    const [roomLength, setRoomLength] = useState(0);
    const [roomAngle, setRoomAngle] = useState(0);
    const [roomXaixs, setRoomXaixs] = useState(0);
    const [roomYaixs, setRoomYaixs] = useState(0);

    const emptyRoom = {
        room_name: '',
        height: 0,
        width: 0,
        length: 0,
        x_axis: 0,
        y_axis: 0,
        angle_room: 0,
        color: '#D3D3D3'
    };
    const emptyUpdateRoom = {
        id: '',
        room_name: '',
        height: 0,
        width: 0,
        length: 0,
        x_axis: 0,
        y_axis: 0,
        angle_room: 0,
        color: ''
    };
    const [roomParameter, setRoomParameter] = useState(emptyRoom);
    const [roomUpdateParameter, setRoomUpdateParameter] = useState(emptyUpdateRoom);
    const [totalRoom, setTotalRoom] = useState([]);

    const handleCreateRoom = (event) => {

        setRoomParameter({ ...roomParameter, [event.target.name]: event.target.value })
    }

    const setStatesORoom = (paramater) => {
        let heightInMeter = (paramater.height * 0.3048);
        let widthInMeter = (paramater.width * 0.3048);
        let lengthInMeter = (paramater.length * 0.3048);
        setRoomHeight(heightInMeter);
        setRoomWidth(widthInMeter);
        setRoomLength(lengthInMeter);
        setRoomColor(paramater.color)
        setRoomAngle(paramater.angle_room)
        setRoomXaixs(paramater.x_axis)
        setRoomYaixs(paramater.y_axis)
        console.log("Room Height:", heightInMeter, "Room width: ", widthInMeter, "Room Length :", lengthInMeter)
    }

    const handleSubmitCreateRoom = (event) => {
        setStatesORoom(roomParameter)
        event.preventDefault();
        addRoom();
    }




    const handleOptionUpdateRoom = (roomId) => {

        setForm("default");
        setUpdateForm("update_room");
        const result = totalRoom.find(({ id }) => id == roomId);
        let parameters = {
            height: Math.round(result.height * 3.28084),
            width: Math.round(result.width * 3.28084),
            length: Math.round(result.length * 3.28084)
        }

        let merged = { ...result, ...parameters };

        console.log(merged);
        setRoomUpdateParameter(merged);

    }

    const handleUpdateRoom = (event) => {

        setRoomUpdateParameter({ ...roomUpdateParameter, [event.target.name]: event.target.value })
    }


    const handleSubmitUpdateRoom = (event) => {
        setStatesORoom(roomUpdateParameter)
        console.log(roomUpdateParameter)
        event.preventDefault();
        updateRoom();
    }


    const updateRoom = () => {
        const objIndex = totalRoom.findIndex((obj => obj.id == roomUpdateParameter.id));
        roomUpdateParameter.height = (roomUpdateParameter.height * 0.3048);
        roomUpdateParameter.width = (roomUpdateParameter.width * 0.3048);
        roomUpdateParameter.length = (roomUpdateParameter.length * 0.3048);
        console.log(roomUpdateParameter)
        totalRoom[objIndex] = roomUpdateParameter;
        setRoomUpdateParameter(emptyUpdateRoom)
        setRoomParameter(emptyRoom)
        setUpdateForm("default");
    }

    //*****************************************************************************************************
    //                   Create Room   end 
    //*****************************************************************************************************




    //*****************************************************************************************************
    //                   Total Room  start 
    //*****************************************************************************************************



    const addRoom = () => {


        const id = "RM-0" + totalRoom.length;
        if (roomParameter.height >= 1) {
            const paramaterOfRoom =
            {
                id: id,
                room_name: roomParameter.room_name,
                height: (roomParameter.height * meter),
                width: (roomParameter.width * meter),
                length: (roomParameter.length * meter),
                x_axis: roomParameter.x_axis,
                y_axis: roomParameter.y_axis,
                color: roomParameter.color,
                angle_room: roomParameter.angle_room,
            }
            setTotalRoom(totalRoom => [...totalRoom, paramaterOfRoom]);
            console.log(totalRoom);
            setRoomParameter(emptyRoom)
        }
    }

    //*****************************************************************************************************
    //                   Total Room  end 
    //*****************************************************************************************************



    const deleteRoom = (id) => {

        if (window.confirm("Are you sure to delete")) {
            const objIndex = totalRoom.findIndex((obj => obj.id == id));
            totalRoom.splice(objIndex, 1);
            if (totalRoom.length == 0) {
                setRoomHeight(0);
                setRoomWidth(0);
                setRoomLength(0);
                setRoomColor('')
                setRoomXaixs(0);
                setRoomYaixs(0);
                setRoomAngle(0);
            }
            console.log(objIndex);
            setUpdateForm("default");
        }

    }




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





    return (

        <div className="container-fluid">
            <div className="row">
                {console.log(totalRoom)}
                <div className="col-sm-12 col-md-2 col-lg-2 col-xl-2">
                    <div className="icon__options">

                        <i onClick={onCreateSelete.bind(this, "create_floor")} className="fa fa-building" data-toggle="tooltip" data-placement="left" title="Create Floor"></i>
                        <i onClick={onCreateSelete.bind(this, "create_room")} className="fa fa-building" data-toggle="tooltip" data-placement="left" title="Create Room"></i>
                        <i onClick={onCreateSelete.bind(this, "create_rack")} className="fa fa-square" data-toggle="tooltip" data-placement="left" title="Create Rack"></i>
                        <i className="fa fa-thermometer-three-quarters" data-toggle="tooltip" data-placement="left" title="Check Temparetrue"></i>
                    </div>
                    {form == 'create_room' && (<div className="App create_from" >
                        <div><h3>Create Room</h3></div>
                        <form onSubmit={handleSubmitCreateRoom} id="creatRoom">

                            <div className="form-group">
                                <label >Enter Room</label>
                                <input type="text" name="room_name" className="form-control" placeholder="Enter Name" value={roomParameter.room_name} onChange={handleCreateRoom} />
                            </div>

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
                                <label >Move on X-axis</label>
                                <input type="number" name="x_axis" className="form-control" placeholder="Move on x-axis" step="0.001" value={roomParameter.x_axis} onChange={handleCreateRoom} />
                            </div>

                            <div className="form-group">
                                <label >Move on Y-axis</label>
                                <input type="number" name="y_axis" className="form-control" placeholder="Move on y-axis" step="0.001" value={roomParameter.y_axis} onChange={handleCreateRoom} />
                            </div>

                            <div className="form-group">
                                <label >Angle of Rack</label>
                                <input type="number" min="0" max="360" name="angle_room" className="form-control" placeholder="Angle Room" value={roomParameter.angle_rook} onChange={handleCreateRoom} />
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
                    {form == 'create_floor' && (<div className="App create_from">
                        <div><h3>Create Floor</h3></div>
                        <form onSubmit={handleSubmitCreateFloor} id="creatFloor">
                            <div className="form-group">
                                <label >Floor Name</label>
                                <input type="text" name="floor_name" className="form-control" placeholder="Enter name" value={floorParameter.floor_name} onChange={handleCreateFloor} />
                            </div>


                            <div className="form-group">
                                <label >Enter Width of Floor (Feet)</label>
                                <input type="number" name="width" className="form-control" placeholder="Width" value={floorParameter.width} onChange={handleCreateFloor} />
                            </div>
                            <div className="form-group">
                                <label >Enter Length of Floor (Feet)</label>
                                <input type="number" name="length" className="form-control" placeholder="Length" value={floorParameter.length} onChange={handleCreateFloor} />
                            </div>

                            <div className="form-group">
                                <label >Pick Color of Room </label>
                                <input type="color" name="color" className="form-control" placeholder="Color Name" value={floorParameter.color} onChange={handleCreateFloor} />
                            </div>
                            <button type="submit" className="btn btn-primary">Create Floor</button>
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
                    {updateForm == 'update_room' && (<div className="App create_from">
                        <div><h3>Update Room</h3></div>
                        <form onSubmit={handleSubmitUpdateRoom} id="updateRack">

                            <div className="form-group">
                                <label >Enter Room</label>
                                <input type="text" name="room_name" className="form-control" placeholder="Enter Name" value={roomUpdateParameter.room_name} onChange={handleUpdateRoom} />
                            </div>

                            <div className="form-group">
                                <label >Enter Height of room (Feet)</label>
                                <input type="number" name="height" className="form-control" placeholder="Height" value={roomUpdateParameter.height} onChange={handleUpdateRoom} />
                            </div>

                            <div className="form-group">
                                <label >Enter Width of room (Feet)</label>
                                <input type="number" name="width" className="form-control" placeholder="Width" value={roomUpdateParameter.width} onChange={handleUpdateRoom} />
                            </div>
                            <div className="form-group">
                                <label >Enter Length of room (Feet)</label>
                                <input type="number" name="length" className="form-control" placeholder="Length" value={roomUpdateParameter.length} onChange={handleUpdateRoom} />
                            </div>

                            <div className="form-group">
                                <label >Move on X-axis</label>
                                <input type="number" name="x_axis" className="form-control" placeholder="Move on x-axis" step="0.001" value={roomUpdateParameter.x_axis} onChange={handleUpdateRoom} />
                            </div>

                            <div className="form-group">
                                <label >Move on Y-axis</label>
                                <input type="number" name="y_axis" className="form-control" placeholder="Move on y-axis" step="0.001" value={roomUpdateParameter.y_axis} onChange={handleUpdateRoom} />
                            </div>

                            <div className="form-group">
                                <label >Angle of Room</label>
                                <input type="number" min="0" max="360" name="angle_room" className="form-control" placeholder="Angle Room" value={roomUpdateParameter.angle_room} onChange={handleUpdateRoom} />
                            </div>

                            <div className="form-group">
                                <label >Pick Color of room </label>
                                <input type="color" name="color" className="form-control" placeholder="Color Name" value={roomUpdateParameter.color} onChange={handleUpdateRoom} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>

                            <button type="button" onClick={deleteRoom.bind(this, roomUpdateParameter.id)} className="btn btn-danger delete__button">Delete</button>
                        </form>

                    </div>)}
                </div>
                <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8">
                    <Canvas className="canvas" shadowMap colorManagement camera={{ position: [-10, 50, 150], fov: 120, far: 10000 }} >
                        <ambientLight intensity={0.3} />
                        <directionalLight

                            intensity={.3}
                            position={[10, 15, 10]}

                        />

                        <mesh position={[0, roomHeight != 0 ? -(.1 + (roomHeight / 2)) : 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[floorWidth, floorLength]}>
                            <planeBufferGeometry />
                            <meshBasicMaterial color={floorColor} side={DoubleSide} />
                        </mesh>

                        {/*************************************************************Create Room Start *********************************************************************/}


                        <group rotation={[0, THREE.Math.degToRad(roomAngle), 0]} position={[roomXaixs, 1.5, roomYaixs]} scale={[roomWidth, roomHeight, roomLength]} >
                            <group>
                                <CreateRoom position={[0, 0, 0]} color={roomColor} scale={[10, 1, 10]} />
                                <CreateRoom position={[0, 5.5, -4.85]} color={roomColor} scale={[9.4, 10, .3]} />
                                <CreateRoom position={[4.85, 5.5, 0]} color={roomColor} scale={[.3, 10, 10]} />
                                <CreateRoom position={[-4.85, 5.5, 0]} color={roomColor} scale={[.3, 10, 10]} />
                            </group>
                        </group>

                        {/* <primitive object={ex}  />
                        <dragControls args={[[ex], camera, domElement]}  /> */}
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

                        {totalRack.length > 0 && totalRack.map((item) => (<DisplayTotalRack paramaters={item} />))}


                        {/*************************************************************Display All Rack End*********************************************************************/}


                        {/*************************************************************Display All Room Start*********************************************************************/}

                        {totalRoom.length > 0 && totalRoom.map((item) => (<DisplayTotalRoom paramaters={item} />))}


                        {/*************************************************************Display All Room End*********************************************************************/}




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
                    <div className="options">
                        {totalRoom.length >= 1 &&
                            (

                                <div className="form__update_rack">
                                    <h3>Room List</h3>
                                    <div className="form-group"  >
                                        {totalRoom.map((item) => (<button className="btn btn-primary btn-rack" onClick={handleOptionUpdateRoom.bind(this, item.id)}>{item.id} - {item.room_name}</button>))}
                                    </div></div>)
                        }
                    </div>

                </div>
            </div>
        </div>



    );
}

export default NestedMesh;
