const express = require('express');
const router = express.Router();

const {Commment} = require("../models/Comment");

router.post("/saveComment", (req, res)=>{

    const comment = new Commment(req.body)

    comment.save((err, comment)=>{
        if(err) return res.json({success: false, err})

        Commment.find({'_id': comment._id})
        .populate('writer')
        .exec((err, result)=>{
            if(err) return res.json({success:false, err})
            res.status(200).json({success:true, result})
        })
    })
})

module.exports=router;