const express=require("express");
const router=express.Router();
const urlController=require("../controllers/urlController");


router.get("/", urlController.getHomePage);

router.post("/shorten", urlController.createShortUrl );

router.get('/:shortUrl', urlController.redirectToOriginalUrl);




module.exports=router;