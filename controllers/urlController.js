const Url=require("../models/urlModel");
const {nanoid}=require("nanoid");

exports.getHomePage=async(req, res)=>{
    res.render('index', {shortUrl:null});
};


exports.createShortUrl=async(req, res)=>{
    const {originalUrl}=req.body;


    //Generate a unique short ID
    const shortUrl=nanoid(7);

    try{
        const newUrl=new Url({
            originalUrl,
            shortUrl,
        });

        await newUrl.save();

        const fullShortUrl=`${req.protocol}://${req.get('host')}/${shortUrl}`;

        res.render('index', {shortUrl:fullShortUrl});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }

};

exports.redirectToOriginalUrl=async(req, res)=>{
    const {shortUrl}=req.params;

    try{
        const url=await Url.findOne({shortUrl});

        if(url){
            return res.redirect(url.originalUrl);
        }
        else{
            return res.status(404).send("URL not found");
        }
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
};