const express=require('express')
const router=express()
const User=require('../models/userModel')
console.log(User)
router.post('https://ticketless-entry-way-system-to-monuments.vercel.app/register',async (req,res)=>{
    const {name,email,password}=req.body
    const newUser=new User({name,email,password})
    try {
        const dup=await User.findOne({email:email});
        if(dup){
            alert("User Already Registered")
            // window.location.href='/';
        }
        else{
        await newUser.save()
        console.log('reg suc')
        res.send('User Registered Successfully')
        }
    } catch (error) {
        return res.status(400).json({message:error})
    }
})

router.post('https://ticketless-entry-way-system-to-monuments.vercel.app/login',async(req,res)=>{
    const {email,password}=req.body
    
    try {
        const user=await User.find({email,password})
        if(user.length>0){
            const curuser={
                name:user[0].name,
                email:user[0].email,
                isAdmin:user[0].isAdmin,
                _id:user[0]._id
            }
            res.status(200).send(curuser );
        }
        else{

            return res.status(400).json({message:'User Login Failed'});
        }
    } catch (error) {
        return res.status(404).json({message:error})
    }
})

router.get('https://ticketless-entry-way-system-to-monuments.vercel.app/getallusers',async (req,res)=>{
    try{
        const users=await User.find({})
        res.send(users)
    }
    catch(error){
        return res.send('err')
    }
})
router.post('https://ticketless-entry-way-system-to-monuments.vercel.app/deleteuser',async(req,res)=>{
    const userid=req.body.userid
    try {
        await User.findOneAndDelete({_id:userid})
        res.send("user deleted successfully")
    } catch ( error) {
        return res.send('err')
    }
})
module.exports = router;
