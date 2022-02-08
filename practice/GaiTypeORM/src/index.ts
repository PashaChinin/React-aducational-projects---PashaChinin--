import "reflect-metadata";
import {createConnection, Like} from "typeorm";
import express, {request, Request, Response} from 'express'
import {Region} from "./entity/Region";
import {Office} from "./entity/Office";
import {User} from "./entity/User";
import {Department} from "./entity/Department";
import {EmployeeInfo} from "./entity/EmployeeInfo";
import {CarInfo} from "./entity/CarInfo";
import {CarEquipment} from "./entity/CarEquipment";
import {CarParams} from "./entity/CarParams";
import {Car} from "./entity/Car";
import {Shift} from "./entity/Shift";
import {Employee} from "./entity/Employee";
import {ViewEmployees} from "./entity/EmployeeView";
import * as console from "console";
import {ViewCars} from "./entity/CarView";
import {ViewTables} from "./entity/dataBaseViews/TablesView";
import {ClientRequest} from "http";

var cors = require('cors')

const app = express()
app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())



//USERS ROUTES---------------------------------------------------------------------

app.route('/users')
//CREATE
.post(async (req: Request, res: Response) => {
const {firstName, lastName, age} = req.body

    try{
    const user = User.create({firstName,lastName,age})
        await user.save()

        return res.status(201).json(user)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ
.get(async (_: Request, res: Response) => {

    try{
        const users = await User.find()


        return res.json(users)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})
//UPDATE
app.put('/users/:uuid', async(req: Request, res:Response) => {
        const uuid = req.params.uuid
        const {firstName, lastName, age} = req.body
        try{
        const user = await User.findOneOrFail({uuid: uuid})
            user.firstName = firstName || user.firstName
            user.lastName = lastName || user.firstName
            user.age = age || user.age
            await user.save()
            console.log(req.body)
            return res.json(user)
        }catch (error)
        {
            console.log(error)
            return res.status(500).json({error: 'Something went wrong'})
        }
    })
//DELETE
app.delete('/users/:uuid', async(req: Request, res:Response) => {
    const uuid = req.params.uuid

    try{
        const user = await User.findOneOrFail({uuid: uuid})

        await user.remove()
        return res.status(204).json({message: 'User deleted successfully'})
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
})
//FIND
app.get('/users/:uuid', async(req: Request, res:Response) => {
    const uuid = req.params.uuid

    try{
        const user = await User.findOneOrFail({uuid: uuid})


        return res.status(200).json({user})
    }catch (error)
    {
        console.log(error)
        return res.status(404).json({user: 'User not found'})
    }
})

//REGION ROUTES----------------------------------------------------------------------------------------


//CREATE REGION
app.post('/regions', async (req:Request, res: Response) => {
    const {regionName, regionShortCode} = req.body

    try{
        const region = Region.create({regionName,regionShortCode})
        await region.save()

        return res.status(201).json(region)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ REGIONS
app.get('/regions', async (req: Request, res:Response) => {

    const {regionName, regionShortCode} = req.body
    try {
        const regions = await Region.find()
        return res.json(regions)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE REGION
app.put('/regions/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    const {regionName, regionShortCode} = req.body
    try{
        const region = await Region.findOneOrFail({uuid: uuid})
        region.regionName = regionName || region.regionName
        region.regionShortCode = regionShortCode || region.regionShortCode

        await region.save()
        console.log(req.body)
        return res.json(region)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE REGION
app.delete('/regions/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const region = await Region.findOneOrFail({uuid: uuid})
        await region.remove()
        console.log(req.body)
        return res.status(204).json('Region successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND REGION
app.get('/regions/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const region = await Region.findOneOrFail({uuid: uuid})

        console.log(req.body)
        return res.status(200).json(region)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})

//OFFICE ROUTES---------------------------------------------------------------------------------------

//CREATE OFFICE
app.post('/offices', async (req:Request, res: Response) => {
    const {officeName, regionId} = req.body

    try{
        const region = new Region()
        region.regionID = regionId
        const office = new Office()
        office.officeName = officeName
        office.region = region
        //const office = Office.create({officeName, regionRegionID})
        await office.save()

        console.log(res.json(office))
        return res.status(201).json(office)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ OFFICES
app.get('/offices', async (req: Request, res:Response) => {


    try {
        const offices = await Office.find()
        return res.json(offices)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE OFFICE
app.put('/offices/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    const {officeName, regionId} = req.body
    try{
        const office = await Office.findOneOrFail({uuid: uuid})
        office.officeName = officeName || office.officeName
        office.region = regionId || office.region

        await office.save()
        console.log(req.body)
        return res.json(office)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE OFFICE
app.delete('/offices/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const office = await Office.findOneOrFail({uuid: uuid})
        await office.remove()
        console.log(req.body)
        return res.status(204).json('Office successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND OFFICE
app.get('/offices/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const office = await Office.find({uuid: uuid})

        console.log(req.body)
        return res.status(200).json(office)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})


//DEPARTMENT ROUTES---------------------------------------------------------------------------------------

//CREATE DEPARTMENT
app.post('/departments', async (req:Request, res: Response) => {
    const {departmentName, officeId} = req.body

    try{
        const office = new Office()
        office.officeID = officeId
        const department = new Department()
        department.departmentName = departmentName
        department.office = office
        await department.save()

        return res.status(201).json(department)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ DEPARTMENT
app.get('/departments', async (req: Request, res:Response) => {


    try {
        const departments = await Department.find()
        return res.json(departments)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE DEPARTMENT
app.put('/departments/', async (req: Request, res:Response) => {

    //const departmentId = req.params.uuid
    const {departmentId ,departmentName, officeID} = req.body
    try{
        console.log("Office ID income " + officeID)
        const department = await Department.findOneOrFail({departmentId: departmentId})
        const office = new Office()
        office.officeID = officeID
        department.departmentName = departmentName || department.departmentName
        department.office = officeID || department.office
        await department.save()
        console.log(req.body)
        return res.json(department)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE DEPARTMENT
app.delete('/departments/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const department = await Department.findOneOrFail({uuid: uuid})
        await department.remove()
        console.log(req.body)
        return res.status(204).json('Department successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND DEPARTMENT
app.get('/departments/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const department = await Department.find({uuid: uuid})

        console.log(req.body)
        return res.status(200).json(department)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})


//EMPLOYEE_INFO ROUTES---------------------------------------------------------------------------------------

//CREATE EMPLOYEE_INFO
app.post('/employees_info', async (req:Request, res: Response) => {
    const {
        employeeName,
        employeeSurname,
        employeeFatherName,
        employeePhoneNumber,
        employeeRank,
        employeePosition,
        employeePrivateTokenNumber,
        employeePhotoPath
    } = req.body

    try{
        const employeeInfo = new EmployeeInfo()

        employeeInfo.employeeName = employeeName
        employeeInfo.employeeSurname = employeeSurname
        employeeInfo.employeeFatherName = employeeFatherName
        employeeInfo.employeePhoneNumber = employeePhoneNumber
        employeeInfo.employeeRank = employeeRank
        employeeInfo.employeePosition = employeePosition
        employeeInfo.employeePrivateTokenNumber = employeePrivateTokenNumber
        employeeInfo.employeePhotoPath = employeePhotoPath
        employeeInfo.isUsedAsEmployee = false


        await employeeInfo.save()

        return res.status(201).json(employeeInfo)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ EMPLOYEE_INFO
app.get('/employees_info', async (req: Request, res:Response) => {


    try {
        const employees_info = await EmployeeInfo.find()
        return res.json(employees_info)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE EMPLOYEE_INFO
app.put('/employees_info/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    const {
        employeeName,
        employeeSurname,
        employeeFatherName,
        employeePhoneNumber,
        employeeRank,
        employeePosition,
        employeePrivateTokenNumber,
        employeePhotoPath
    } = req.body
    try{
        const employee_info = await EmployeeInfo.findOneOrFail({uuid: uuid})
        employee_info.employeeName = employeeName || employee_info.employeeName
        employee_info.employeeSurname =  employeeSurname || employee_info.employeeSurname
        employee_info.employeeFatherName =  employeeFatherName || employee_info.employeeFatherName
        employee_info.employeePhoneNumber =  employeePhoneNumber || employee_info.employeePhoneNumber
        employee_info.employeeRank =  employeeRank || employee_info.employeeRank
        employee_info.employeePosition =  employeePosition || employee_info.employeePosition
        employee_info.employeePrivateTokenNumber =  employeePrivateTokenNumber || employee_info.employeePrivateTokenNumber
        employee_info.employeePhotoPath =  employeePhotoPath || employee_info.employeePhotoPath

        await employee_info.save()
        console.log(req.body)
        return res.json(employee_info)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE EMPLOYEE_INFO
app.delete('/employees_info/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const employee_info = await EmployeeInfo.findOneOrFail({uuid: uuid})
        await employee_info.remove()
        console.log(req.body)
        return res.status(204).json('Employee info successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND EMPLOYEE_INFO
app.get('/employees_info/:uuid', async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const employee_info = await EmployeeInfo.find({uuid: uuid})

        console.log(req.body)
        return res.status(200).json(employee_info)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})


//CAR_INFO ROUTES---------------------------------------------------------------------------------------

//CREATE CAR_INFO
app.post('/car_info', async (req:Request, res: Response) => {
    const {
        government_number,
        onboard_number

    } = req.body

    try{
        const car_info = new CarInfo()

        car_info.government_number = government_number
        car_info.onboard_number = onboard_number

        await car_info.save()

        return res.status(201).json(car_info)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ CAR_INFO
app.get('/car_info',async (req: Request, res:Response) => {


    try {
        const car_info = await CarInfo.find()
        return res.json(car_info)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE CAR_INFO - CHECK FOR INCOMING PARAM TO UPDATE(gov_num)
app.put('/car_info/',async (req: Request, res:Response) => {

    //const id = Number(req.params.id)
    const {
        id,
        governmentNumber,
        onBoardNumber
    } = req.body
    try{
        const car_info = await CarInfo.findOneOrFail({car_infoID: id})

            car_info.government_number = governmentNumber
            car_info.onboard_number =  onBoardNumber




        await car_info.save()
        console.log(car_info)
        return res.json(car_info)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE CAR_INFO - CHECK FOR INCOMING PARAM TO DELETE(gov_num)
app.delete('/car_info/:id',async (req: Request, res:Response) => {

    const id = Number(req.params.id)
    try{
        const car_info = await CarInfo.findOneOrFail({car_infoID: id})
        await car_info.remove()
        //await car_info.save()
        console.log(req.body)
        return res.status(204).json('CarInfo info successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND CAR_INFO
app.get('/car_info/:gov_num',async (req: Request, res:Response) => {

    const gov_number = req.params.gov_num
    try{
        //const car_info = await CarInfo.find({government_number: gov_number})
        const car_infos = await CarInfo
            .find({
                where: [
                    {government_number: Like(`%${gov_number.toString()}%`)}

                ]
            })

        console.log(req.body)
        return res.status(200).json(car_infos)
    }catch (error)
    {
        console.log(error + " - строка ошибки " + gov_number)
        return res.status(500).json({error: 'Something went wrong'})
    }

})


//CAR_EQUIPMENT ROUTES---------------------------------------------------------------------------------------

//CREATE CAR_EQUIPMENT
app.post('/car_equipment', async (req:Request, res: Response) => {
    const {
        road_sights,
        spikes,
        black_bags,
        emergency_kit
    } = req.body

    try{
        const car_equipment = new CarEquipment()

        car_equipment.road_sights = road_sights
        car_equipment.spikes = spikes
        car_equipment.black_bags = black_bags
        car_equipment.emergency_kit = emergency_kit

        await car_equipment.save()

        return res.status(201).json(car_equipment)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ CAR_EQUIPMENT
app.get('/car_equipment',async (req: Request, res:Response) => {


    try {
        const car_equipment = await CarEquipment.find()
        return res.json(car_equipment)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE CAR_EQUIPMENT
app.put('/car_equipment/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    const {
        road_sights,
        spikes,
        black_bags,
        emergency_kit
    } = req.body
    try{
        const car_equipment = await CarEquipment.findOneOrFail({uuid: uuid})
        car_equipment.road_sights = road_sights || car_equipment.road_sights
        car_equipment.spikes = spikes || car_equipment.spikes
        car_equipment.black_bags = black_bags || car_equipment.black_bags
        car_equipment.emergency_kit = emergency_kit || car_equipment.emergency_kit


        await car_equipment.save()
        console.log(req.body)
        return res.json(car_equipment)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE CAR_EQUIPMENT
app.delete('/car_equipment/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const car_equipment = await CarEquipment.findOneOrFail({uuid: uuid})
        await car_equipment.remove()
        console.log(req.body)
        return res.status(204).json('CarEquipment info successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND CAR_EQUIPMENT
app.get('/car_equipment/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const car_equipment = await CarEquipment.find({uuid: uuid})

        console.log(req.body)
        return res.status(200).json(car_equipment)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})


//CAR_PARAMETERS ROUTES---------------------------------------------------------------------------------------

//CREATE CAR_PARAMS
app.post('/car_parameters', async (req:Request, res: Response) => {
    const {
        brand,
        model,
        engine_power,
        passed_way,
        engine_type,
        engine_volume,
        car_image
    } = req.body

    try{
        const car_params = new CarParams()

        car_params.brand = brand
        car_params.model = model
        car_params.engine_power = engine_power
        car_params.passed_way = passed_way
        car_params.engine_type = engine_type
        car_params.engine_volume = engine_volume
        car_params.car_image = car_image

        await car_params.save()

        return res.status(201).json(car_params)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ CAR_PARAMS
app.get('/car_parameters',async (req: Request, res:Response) => {


    try {
        const car_params = await CarParams.find()
        return res.json(car_params)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE CAR_PARAMS
app.put('/car_parameters/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    const {
        brand,
        model,
        engine_power,
        passed_way,
        engine_type,
        engine_volume,
        car_image
    } = req.body
    try{
        const car_params = await CarParams.findOneOrFail({uuid: uuid})
        car_params.brand = brand || car_params.brand
        car_params.model = model || car_params.model
        car_params.engine_power = engine_power || car_params.engine_power
        car_params.passed_way = passed_way || car_params.passed_way
        car_params.engine_type = engine_type || car_params.engine_type
        car_params.engine_volume = engine_volume || car_params.engine_volume
        car_params.car_image = car_image || car_params.car_image


        await car_params.save()
        console.log(car_params.toJSON())
        return res.json(car_params)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE CAR_PARAMS
app.delete('/car_parameters/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const car_params = await CarParams.findOneOrFail({uuid: uuid})
        await car_params.remove()
        console.log(req.body)
        return res.status(204).json('CarParameters successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND CAR_PARAMS
app.get('/car_parameters/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const car_params = await CarParams.find({uuid: uuid})

        console.log(req.body)
        return res.status(200).json(car_params)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})


//CAR ROUTES---------------------------------------------------------------------------------------

//CREATE CAR
app.post('/car', async (req:Request, res: Response) => {
    const {

        car_params,
        car_equip,
        car_info
    } = req.body

    try{
        const car = new Car()
        const car_parameters = new CarParams()
        car_parameters.paramsID = car_params
        const car_equipment = new CarEquipment()
        car_equipment.equipmentID = car_equip
        const car_information = new CarInfo()
        car_information.car_infoID = car_info


        //car_params.is_using_in_shift = is_using_in_shift
        car.car_params = car_parameters
        car.car_equip = car_equipment
        car.car_info = car_information
        car.is_using_in_shift = false

        await car.save()

        return res.status(201).json(car)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ CAR
app.get('/car',async (req: Request, res:Response) => {


    try {
        const car = await ViewCars.find()
        return res.json(car)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE CAR
app.put('/car/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    const {
        is_using_in_shift,
        car_params,
        car_equip,
        car_info
    } = req.body
    try{
        const car = await Car.findOneOrFail({uuid: uuid})
        car.is_using_in_shift = is_using_in_shift || car.is_using_in_shift
        car.car_params = car_params || car.car_params
        car.car_equip = car_equip || car.car_equip
        car.car_info = car_info || car.car_info



        await car.save()
        console.log(req.body)
        return res.json(car)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE CAR
app.delete('/car/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const car = await Car.findOneOrFail({uuid: uuid})
        await car.remove()
        console.log(req.body)
        return res.status(204).json('Car successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND CAR
app.get('/car/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const car = await Car.find({uuid: uuid})

        console.log(req.body)
        return res.status(200).json(car)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})


//SHIFT ROUTES---------------------------------------------------------------------------------------

//CREATE SHIFT -- NEED TESTING
app.post('/shift', async (req:Request, res: Response) => {
    const {

        usingCar

    } = req.body

    try{
        const shift = new Shift()
        const [carUsage] = await Car.find({carID: usingCar})
        const car = new Car()
        car.carID = usingCar
        shift.usingCar = car
        console.log("carUsage.is_using_in_shift  - " +  carUsage.is_using_in_shift)

        if (carUsage.is_using_in_shift == true)
        {
            return res.status(500).json({error: 'Something went wrong. Maybe car is used in shift already'})
        }
        else {
            console.log("Shift != passed, car is in false state - " + shift.usingCar.is_using_in_shift)
            car.is_using_in_shift = true
            await car.save()
            shift.isClosed = false
            //shift.usingCar = car
            await shift.save()

            return res.status(201).json(shift)


        }

    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ SHIFT
app.get('/shift',async (req: Request, res:Response) => {


    try {
        const shift = await Shift.find()
        return res.json(shift)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE SHIFT
app.put('/shift/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    const {

        isClosed

    } = req.body
    try{

        const shift = await Shift.findOneOrFail({uuid: uuid, relations: ["employee","usingCar"]})
        //const car = new Car()
        //const employee = new Employee()
        console.log(JSON.stringify(shift))
        //employee.inShift = null


        if (isClosed === true && shift.isClosed === false) {
            shift.isClosed = isClosed || shift.isClosed
           // car.is_using_in_shift = false
            shift.employee = null


        }
        else {
            shift.isClosed = isClosed || shift.isClosed
        }




        await shift.save()
        console.log(req.body)
        return res.json(shift)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE SHIFT
app.delete('/shift/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const shift = await Shift.findOneOrFail({uuid: uuid})
        await shift.remove()
        console.log(req.body)
        return res.status(204).json('Shift successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND SHIFT
app.get('/shift/:uuid',async (req: Request, res:Response) => {

    const uuid = req.params.uuid
    try{
        const shift = await Shift.find({uuid: uuid})

        console.log(req.body)
        return res.status(200).json(shift)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})


//EMPLOYEE ROUTES---------------------------------------------------------------------------------------

//CREATE EMPLOYEE
app.post('/employee', async (req:Request, res: Response) => {
    const {
        dep,
        employeeInfo,
        inShift

    } = req.body

    console.log(dep,employeeInfo,inShift + " request BODY")
    console.log("REQUEST")
    try {
        const employee = new Employee()
        const department = new Department()
        department.departmentId = dep
        const shift = new Shift()
        shift.shiftID = inShift
        const employee_info = new EmployeeInfo()
        employee_info.employeeInfoId = employeeInfo
        employee.employeeInfo = employee_info
        if (employee.employeeInfo.isUsedAsEmployee != true)
        {
            employee.employeeInfo.isUsedAsEmployee = true
        }
        employee.dep = department
        employee.inShift = shift

        await employee.save()
        await employee_info.save()

        return res.status(201).json(employee)
    }
    catch (err)
    {
        console.log(err)
        return res.status(500)
    }
})
//READ EMPLOYEE
app.get('/employee',async (req: Request, res:Response) => {


    try {
        const employees = await ViewEmployees.find()
        return res.json(employees)
    }
    catch (error){
        console.log(error)
        return res.status(500).json({error:'Something wrong'})
    }
})
//UPDATE EMPLOYEE
app.put('/employee/',async (req: Request, res:Response) => {

    //const uuid = req.params.uuid
    const {
        dep,
        inShift,
        id

    } = req.body
    try{
        const employee = await Employee.findOneOrFail({employeeID: id})
        employee.dep = dep || employee.dep
        employee.inShift = inShift || employee.inShift


        await employee.save()
        console.log(req.body)
        return res.json(employee)
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//DELETE EMPLOYEE
app.delete('/employee/:id',async (req: Request, res:Response) => {

    const employeeID = req.params.id
    try{
        const employee = await Employee.findOneOrFail({employeeID: employeeID})
        await employee.remove()
        console.log(req.body)
        return res.status(204).json('Employee successfully deleted')
    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})
//FIND EMPLOYEE
app.get('/employee/:search',async (req: Request, res:Response) => {

    const search = req.params.search
    try{
        const employees = await ViewEmployees
            .find({
                where: [
                    {employeeSurname: Like(`%${search}%`)},
                    {employeeName: Like(`%${search}%`)},
                    {employeeFatherName: Like(`%${search}%`)}
                ]
            })
        console.log(search)
        return res.status(200).json(employees)

    }catch (error)
    {
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }

})

//CUSTOM ROUTES FOR APPLICATION ----------------------------------------------------------------------------------------

//CHECK LOGIN & PASSWORD ROUTE
app.post('/login_check', async (req: Request, res: Response) => {
    const {
        login,
        password

    } = req.body

    console.log(req.body)

    try{
        //const user = await User.findOneOrFail({lastName: login})
        if (login === 'admin')
        if (password == '8855')
        return res.status(200).json({isLogged: true, message: "Успешно!"})
    }
    catch (err)
    {
        console.log(err)
        return res.status(500).json("Невеный логин или пароль!")
    }
})
app.get('/database_tables', async(req: Request, res: Response) => {
    try {

        const tables = await ViewTables.find()
        return res.json(tables)

    }catch (e){
        console.log(e)
        return res.status(500).json({error:'Something wrong'})
    }

})
app.get('/control_database', async (req:Request, res: Response) => {
    const {
        tableName,
        operationName,
        mainData
                    } = req.body


})




createConnection()
    .then(async connection => {

    app.listen(5000, () => console.log('Server up on http://localhost:5000'))

}).catch(error => console.log(error));
