const cloudinary = require('../middleware/cloud')
const fs = require('fs')

const removeTemp = (path) => {
    fs.unlinkSync(path);
}

const imageCtrl = {
    uploadProductImg: async (req, res) => { 
        try{
            // res.json({ msg: "upload image"})
        //    res.json({ files: req.files })
        if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ msg: "No files were uploaded."})

        const file = req.files.productImg;

        // validate file size

        if(file.size > 1 * 1024 * 1024){
            removeTemp(file.tempFilePath)
            return res.status(400).json({msg: "File Size must be less than 5mb..."})
        }
        // res.json({ files: file })
         //validate image type ! = =
         if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/webp') {
            removeTemp(file.tempFilePath)
            return res.status(400).json({msg: "only allow jpeg/png/webp format"})
        }

        //upload
       await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "products"}, async (err, result)=> {
            if(err) res.status(400).json({msg: err.message })
            removeTemp(file.tempFilePath);
            return res.status(200).json({
                public_id: result.public_id,
                url: result.secure_url
            })
        })

        }catch (err) {
            return res.status(500).json({ msg: err.message})
        }

       
     },
    deleteProductImg: async (req, res) => { 
        try{
            // res.json({ msg: "delete image"})
            const { public_id } = req.body;

            if(!public_id)
                return res.status(400).json({ msg: "No pblic id found"})

                await cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                    if (err) throw err;

                    res.status(200).json({msg: "Image Successfully deleted"})
                })
        }catch(err){
            return res.status(500).json({ msg: err.message})
        }
     },
     uploadProfileImg: async (req, res) => {
        try{
            // res.json({ msg: "upload image"})
        //    res.json({ files: req.files })
        if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ msg: "No profile were uploaded."})

        const file = req.files.profileImg;

        // validate file size

        if(file.size > 1 * 1024 * 1024){
            removeTemp(file.tempFilePath)
            return res.status(400).json({msg: "File Size must be less than 5mb..."})
        }
        // res.json({ files: file })
         //validate image type ! = =
         if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/webp') {
            removeTemp(file.tempFilePath)
            return res.status(400).json({msg: "only allow jpeg/png/webp format"})
        }

        //upload
       await cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "profile"}, async (err, result)=> {
            if(err) res.status(400).json({msg: err.message })
            removeTemp(file.tempFilePath);
            return res.status(200).json({
                public_id: result.public_id,
                url: result.secure_url
            })
        })

        }catch (err) {
            return res.status(500).json({ msg: err.message})
        }

       
     },
     deleteProfileImg: async (req, res) => {
        try{
            // res.json({ msg: "delete image"})
            const { public_id } = req.body;

            if(!public_id)
                return res.status(400).json({ msg: "No pblic id found"})

                await cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                    if (err) throw err;

                    res.status(200).json({msg: "Image Successfully deleted"})
                })
        }catch(err){
            return res.status(500).json({ msg: err.message})
        }
     }
}

module.exports = imageCtrl;