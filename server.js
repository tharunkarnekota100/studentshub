const express = require('express');
const mongoose = require('mongoose');
const users = require('./usermodel')
const jwt = require('jsonwebtoken');
const middleware = require('./middleware')
const reviewmodel = require('./reviewmodel')
const cors = require('cors');

const projectmodel = require('./Projectmodel')
const wantedmodel = require('./wantedmodel')
const contactmodel = require('./contactmodel')
const supportteammodel = require('./supportteammodel')
const studentprojectmodel = require('./studentprojectmodel')
const resourcemodel = require('./resourcemodel')

////

const usersbme = require('./usermodel2') 
const seatmodel = require('./seatmodel')
const poster = require('./poster')
const contactmodelbme = require('./contactmodel2')
const supportteammodelbme = require('./supportteammodel2')
const openregistermodel = require('./openregister')
const nexteventmodel = require('./nexteventmodel')
const yearmodel = require('./yearmodel')


const app = express();
mongoose.connect('mongodb+srv://tharunkarnekota:tharunkarnekota@cluster0.61jm6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    ()=> console.log('Db connected..')
)

app.use(express.json());
app.use(cors({origin:"*"}));


app.post('/register',async (req,res) =>{
    try{
        const { fullname,collegeId,branch,email,mobile,github,linkedin,skill,password,confirmpassword } = req.body;
        const exist = await users.findOne({email});
        if(exist){
            return res.status(200).send('user already registered')
        }
        const existId = await users.findOne({collegeId});
        if(existId){
            return res.status(200).send('this collegeID already registered')
        }
        if(password !== confirmpassword){
            return res.status(400).send('password invalid')
        }

        let newUser = new users({
            fullname,collegeId,branch,email,mobile,github,linkedin,skill,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User Registered Successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('register Server Error')
    }
})


app.post('/login',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await users.findOne({email})
        if(!exist){
            return res.status(200).send('User not Exist plz register')
        }
        if(exist.password !== password){
            return res.status(200).send('password invalid')
        }
        let payload = {
            user : {
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token})
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).send('login Server Error')
    }
})

app.get('/allprofiles',middleware,async (req,res) =>{
    try{
        let allprofiles = await users.find();
        return res.json(allprofiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('allprofiles Server Error')
    }
})

app.get('/myprofile',middleware, async (req,res)=>{
    try{
        let myprofile = await users.findById(req.user.id);
        return res.json(myprofile);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('myprofile Server Error')
    }
})



app.put('/updatemyprofile/:id/:newskill', async (req,res)=>{
    try{
        const updated = await users.findByIdAndUpdate(req.params.id,{
            
            skill : req.params.newskill || "c",
            
        })
        return res.status(200).json("successfully updated new skill");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatemyprofile Server Error')
    }
})


app.put('/updatemygithub/:id/:newgithub', async (req,res)=>{
    try{
        const updated = await users.findByIdAndUpdate(req.params.id,{
            
            github : req.params.newgithub || "-",
            
        })
        return res.status(200).json("successfully updated github");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatemygithub Server Error')
    }
})


app.put('/updatemylinkedin/:id/:newlinkedin', async (req,res)=>{
    try{
        const updated = await users.findByIdAndUpdate(req.params.id,{
            
            linkedin : req.params.newlinkedin || "-",
            
        })
        return res.status(200).json("successfully updated linkedin");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatemylinkedi  Server Error')
    }
})



app.post('/addreview',middleware,async (req,res)=>{
    try{
        const {messageReceiver,message} = req.body;
        const exist = await users.findById(req.user.id)
        const newReview = new reviewmodel({
            messageSender : exist.email,
            messageReceiver,
            message
        })
        newReview.save();
        return res.status(200).send('Message Sent successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addreview Server Error')
    }
})






app.post('/addstudentproject',middleware,async(req,res)=>{
    try{
        const {name,clgid,projecttitle,projectdescription,github,video,website} = req.body;
        
        const newstudentproject = new studentprojectmodel({
            name,
            clgid,
            projecttitle,
            projectdescription,
            github,
            video,
            website
        })
        await newstudentproject.save();
        return res.status(200).send('project saved successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addproject Server Error ')
    }
})

app.get('/getstudentproject',middleware,async(req,res)=>{
    try{
        let projectts = await studentprojectmodel.find();
        if(projectts.length>=1){
            return res.status(200).json(projectts);
        }
        else{
            return res.status(200).json(sample);
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getproject Server Error')
    }
})










app.post('/addsupportteam',middleware,async(req,res)=>{
    try{
        const {name,clgid,position,mobile,email} = req.body;
        
        const newsupportteam = new supportteammodel({
            name,
            clgid,
            position,
            mobile,
            email
        })
        await newsupportteam.save();
        return res.status(200).send('team member saved successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addsupportteam Server Error ')
    }
})

app.get('/getsupportteam',middleware,async(req,res)=>{
    try{
        let projectts = await supportteammodel.find();
        if(projectts.length>=1){
            return res.status(200).json(projectts);
        }
        else{
            return res.status(200).json(sample);
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getproject Server Error')
    }
})

app.get('/getpresentuser',middleware,async(req,res)=>{
    try{
        const exist = await users.findById(req.user.id)
        return res.status(200).json(exist.collegeId);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getpresentuser Server Error')
    }
})



app.post('/addproject',middleware,async(req,res)=>{
    try{
        const {project} = req.body;
        const exist = await users.findById(req.user.id)
        const newproject = new projectmodel({
            profileId : exist.id,
            project
        })
        await newproject.save();
        return res.status(200).send('project saved successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addproject Server Error')
    }
})


const sample = [{
    profileId: '1',
    project:"No project added yet"

}]

app.get('/getproject',middleware,async(req,res)=>{
    try{
        let projectts = await projectmodel.find();
        let userprojectt = projectts.filter(proj => proj.profileId === req.user.id)
        // console.log(userprojectt);
        // console.log(sample);
        if(userprojectt.length>=1){
            return res.status(200).json(userprojectt);
        }
        else{
            return res.status(200).json(sample);
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getproject Server Error')
    }
})


app.get('/getproject2/:id',middleware,async(req,res)=>{
    try{
        let projectts = await projectmodel.find();
        let userprojectt = projectts.filter(projj => projj.profileId === req.params.id)
        // console.log(userprojectt);
        // console.log(sample);
        
        if(userprojectt.length>=1){
            return res.status(200).json(userprojectt);
        }
        else{
            return res.status(200).json(sample);
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getproject Server Error')
    }
})










app.post('/addrequirements',middleware,async(req,res)=>{
    try{
        const {skillsreq,theme} = req.body;
        const exist = await users.findById(req.user.id)
        const newwanted = new wantedmodel({
            userid : exist.id,
            clgid : exist.collegeId,
            name : exist.fullname,
            skillsreq,
            theme
        })
        await newwanted.save();
        return res.status(200).send('requirements added successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('requirements Server Error')
    }
})

app.get('/getrequirements',middleware,async (req,res) =>{
    try{
        let allreq = await wantedmodel.find();
        return res.json(allreq);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('allprofiles Server Error')
    }
})






app.post('/addquery',middleware,async(req,res)=>{
    try{
        const {problem} = req.body;
        const exist = await users.findById(req.user.id)
        const newquery = new contactmodel({
            userid : exist.id,
            username : exist.fullname,
            clgid : exist.collegeId,
            problem
        })
        await newquery.save();
        return res.status(200).send('your problem sent successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('requirements Server Error')
    }
})


app.get('/getquery',async(req,res) => {
    try{
        let allqueries = await contactmodel.find();
        return res.json(allqueries);
    }
    catch{
        console.log(err);
        return res.status(500).send('getquery Server Error')
    }
})


app.delete('/deletequery/:id',async(req,res) => {
    try{
        await contactmodel.findByIdAndDelete(req.params.id)
        return res.status(200).send('query deleted successfully')
    }
    catch(err){
        console.log(err)
    }
})



app.post('/addresource',async(req,res)=>{
    try{
        const {Rname,Resourcedescription,weburl,pic} = req.body;
        // const exist = await users.findById(req.user.id)
        const newresource = new resourcemodel({
            Rname,
            Resourcedescription,
            weburl,
            pic
        })
        await newresource.save();
        return res.status(200).send('new resource added successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('add resourceServer Error')
    }
})


app.get('/getresource',async(req,res)=>{
    try{
        let allresources = await resourcemodel.find();
        return res.json(allresources);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('get resource Server Error')
    }
})





app.get('/myreview',middleware,async (req,res)=>{
    try{
        let allreviews = await reviewmodel.find();
        let myreviews = allreviews.filter(review => review.messageReceiver.toString() === req.user.id.toString());
        return res.status(200).json(myreviews)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('myreview Server Error')
    }
})



app.delete('/deletereview/:id',async(req,res) => {
    try{
        await reviewmodel.findByIdAndDelete(req.params.id)
        return res.status(200).send('Message deleted successfully')
    }
    catch(err){
        console.log(err)
    }
})


app.delete('/delete/:id',async(req,res) => {
    try{
        await users.findByIdAndDelete(req.params.id)
        return res.status(200).send('deleted successfully')
    }
    catch(err){
        console.log(err)
    }
})


app.delete('/deletedescription/:id',async(req,res) => {
    try{
        let descripdelete = await descriptionmodel.find();
        let userdescrip = descripdelete.filter(descr => descr.profileId === req.params.id)
        // console.log("hiiii")
        let len = userdescrip.length
        if(len>=1){
            // console.log(userdescrip[len-1].id);
            await descriptionmodel.findByIdAndDelete(userdescrip[len-1].id)
            return res.status(200).send('deleted successfully')
        }
        else{
            return res.status(200).send('Their is noting to delete')
        }
    }
    catch(err){
        console.log(err)
    }
})














//////////////////////////////////////////////////////////////////////////////////////////////////////////////////












app.post('/registerbme',async (req,res) =>{
    try{
        const { fullname,collegeId,branch,email,mobile,password,confirmpassword } = req.body;
        const exist = await usersbme.findOne({email});
        if(exist){
            return res.status(200).send('user already registered')
        }
        const existId = await usersbme.findOne({collegeId});
        if(existId){
            return res.status(200).send('this collegeID already registered')
        }
        if(password !== confirmpassword){
            return res.status(400).send('password invalid')
        }

        let newUser = new usersbme({
            fullname,collegeId,branch,email,mobile,password,confirmpassword
        })
        newUser.save();
        return res.status(200).send('User Registered Successfully')
    }
    catch(err){
        console.log(err)
        return res.status(500).send('register Server Error')
    }
})


app.post('/loginbme',async (req,res)=>{
    try{
        const {email,password} = req.body;
        const exist = await usersbme.findOne({email})
        if(!exist){
            return res.status(200).send('User not Exist plz register')
        }
        if(exist.password !== password){
            return res.status(200).send('password invalid')
        }
        let payload = {
            user : {
                id : exist.id
            }
        }
        jwt.sign(payload,'jwtPassword',{expiresIn:360000000},
        (err,token)=>{
            if(err) throw err
            return res.json({token})
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).send('login Server Error')
    }
})


app.post('/addUser',async(req,res) =>{
    const {clgId,namee,password,seatno} = req.body;
    try{
        const newUser = new seatmodel({
            clgId,
            namee,
            password,
            seatno
        })
        await newUser.save();
        return res.json("suceessfully seat allocated")
    }
    catch(err){
        console.log(err)
    }
})


app.get('/getuser',async(req,res)=>{
    try{
        return res.json(await seatmodel.find())
    }
    catch(err){
        console.log(err);
        return res.send("getuser server error")
    }
})



app.post('/addposter',async(req,res) =>{
    const {pic} = req.body; 
    try{
        const newPoster = new poster({
            pic
        })
        await newPoster.save();
        return res.json("suceessfully poster Updated")
    }
    catch(err){
        console.log(err)
    }
})


app.get('/getposter',async(req,res)=>{
    try{
        return res.json(await poster.find())
    }
    catch(err){
        console.log(err);
        return res.send("getposter server error")
    }
})



app.get('/myprofilebme',middleware, async (req,res)=>{
    try{
        let myprofile = await usersbme.findById(req.user.id);
        return res.json(myprofile);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('myprofile Server Error')
    }
})






app.post('/addsupportteambme',middleware,async(req,res)=>{
    try{
        const {name,clgid,position,mobile,email} = req.body;
        
        const newsupportteam = new supportteammodelbme({
            name,
            clgid,
            position,
            mobile,
            email
        })
        await newsupportteam.save();
        return res.status(200).send('team member saved successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addsupportteam Server Error ')
    }
})

app.get('/getsupportteambme',async(req,res)=>{
    try{
        let projectts = await supportteammodelbme.find();
        if(projectts.length>=1){
            return res.status(200).json(projectts);
        }
        else{
            return res.status(200).json(projectts);
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getproject Server Error')
    }
})




app.put('/updatesupportteambme/:id/:position',middleware,async(req,res)=>{
    try{
        const updated = await supportteammodelbme.findByIdAndUpdate(req.params.id,{
            
            position : req.params.position || "leader",
            
        })
        return res.status(200).json(updated);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatesupportteam Server Error')
    }
})



app.put('/updatesupportteambme/:id',middleware,async(req,res)=>{
    try{

        const updated = await supportteammodelbme.findByIdAndUpdate(req.params.id,{
            name : req.body.name || "rock star",
            clgid : req.body.clgid || "19911A0000",
            position : req.body.position || "leader",
            mobile : req.body.mobile || "1234512345",
            email : req.body.email || "t@gmail.com"
        })

        return res.status(200).json(updated);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('updatesupportteam Server Error')
    }
})




app.get('/getpresentuserbme',middleware,async(req,res)=>{
    try{
        const exist = await usersbme.findById(req.user.id)
        return res.status(200).json(exist.collegeId);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('getpresentuser Server Error')
    }
})



app.post('/addnextevent',async(req,res)=>{
    try{
        const {nextevent} = req.body; 
        const newnextevent = new nexteventmodel({
            nextevent
        })
        await newnextevent.save();
        return res.status(200).send('next event updated successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addnextevent Server Error')
    }
})

app.get('/getnextevent',async(req,res)=>{
    try{
        const exist = await nexteventmodel.find()
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getnextevent Server Error')
    }
})

app.put('/updatenextevent/:id/:nextevent',async(req,res)=>{
    try{
        const updated = await nexteventmodel.findByIdAndUpdate(req.params.id,{
            
            nextevent : req.params.nextevent || "No Events",
            
        })
        return res.status(200).send("Updated next event succesfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('closeregister Server Error')
    }
})




app.post('/addyears',async(req,res)=>{
    try{
        const {year1,year2,year3,year4} = req.body; 
        const newyear = new yearmodel({
            year1,
            year2,
            year3,
            year4
        })
        await newyear.save();
        return res.status(200).send('batches updated successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addyears Server Error')
    }
})


app.get('/getyears',async(req,res)=>{
    try{
        const exist = await yearmodel.find()
        
        return res.status(200).json(exist);
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getyears server error')
    }
})


app.put('/updateyears/:id',async(req,res)=>{
    try{
        const {year1,year2,year3,year4} = req.body;
        const updated = await yearmodel.findByIdAndUpdate(req.params.id,{
            
            year1 : year1 || "-",
            year2 : year2 || "-",
            year3 : year3 || "-",
            year4 : year4 || "-"
            
        })
        return res.status(200).send("Updated years succesfully");
    }
    catch(err){
        console.log(err);
        return res.status(500).send('closeregister Server Error')
    }
})


app.delete('/deleteyears/:id',async(req,res) => {
    try{
        const deletedyears = await yearmodel.findByIdAndDelete(req.params.id)
        return res.status(200).send('deleted successfully')
    }
    catch(err){
        console.log(err)
    }
})





app.post('/addopenregister',async(req,res)=>{
    try{
        const {dummy} = req.body; 
        const newopenregister = new openregistermodel({
            dummy
        })
        await newopenregister.save();
        return res.status(200).send('registration opened successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('addopenregister Server Error')
    }
})

app.get('/getopenregister',async(req,res)=>{
    try{
        const exist = await openregistermodel.find()
        return res.status(200).json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('getopenregister Server Error')
    }
})

// app.put('/closeregister/:id/:num',async(req,res)=>{
//     try{
//         const updated = await openregistermodel.findByIdAndUpdate(req.params.id,{
            
//             dummy : req.params.num || "1",
            
//         })
//         return res.status(200).json(updated);
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).send('closeregister Server Error')
//     }
// })
//



app.delete('/deletecloseregister/:id',async(req,res) => {
    try{
        const deletedregister = await openregistermodel.findByIdAndDelete(req.params.id)
        return res.status(200).send('closed registration successfully')
    }
    catch(err){
        console.log(err)
    }
})






app.post('/addquerybme',middleware,async(req,res)=>{
    try{
        const {problem} = req.body;
        const exist = await usersbme.findById(req.user.id)
        const newquery = new contactmodelbme({
            userid : exist.id,
            username : exist.fullname,
            clgid : exist.collegeId,
            problem
        })
        await newquery.save();
        return res.status(200).send('your problem sent successfully')
    }
    catch(err){
        console.log(err);
        return res.status(500).send('requirements Server Error')
    }
})

app.get('/getquerybme',async(req,res)=>{
    try{
        const allproblems = await contactmodelbme.find()
        return res.status(200).json(allproblems);

    }
    catch(err){
        console.log(err);
        return res.status(500).send('requirements Server Error')
    }
})


app.delete('/deleteproblembme/:id',async(req,res) => {
    try{
        const deletedproblem = await contactmodelbme.findByIdAndDelete(req.params.id)
        return res.status(200).send('deleted successfully')
    }
    catch(err){
        console.log(err)
    }
})









app.listen(5000,()=> console.log('Server is Running..'))