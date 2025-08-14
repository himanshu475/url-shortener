const Url=require("../models/urlModel");
const {nanoid}=require("nanoid");

exports.getHomePage=async(req, res)=>{
    res.render('index', {shortUrl:null, clicks:null});
};


exports.createShortUrl=async(req, res)=>{
    const {originalUrl}=req.body;


    //Generate a unique short ID
    

    try{

        const existingUrl = await Url.findOne({ originalUrl });

        if (existingUrl) {
            // If it exists, pass the existing data to the view
            const fullShortUrl = `${req.protocol}://${req.get('host')}/${existingUrl.shortUrl}`;
            return res.render('index', { shortUrl: fullShortUrl, clicks: existingUrl.clicks });
        }

        const shortUrl=nanoid(7);

        const newUrl=new Url({
            originalUrl,
            shortUrl,
        });

        const savedUrl=await newUrl.save();

        const fullShortUrl=`${req.protocol}://${req.get('host')}/${shortUrl}`;

        res.render('index', {shortUrl:fullShortUrl, clicks:savedUrl.clicks});
    }
    catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }

};

exports.redirectToOriginalUrl=async(req, res)=>{
    const {shortUrl}=req.params;

    try{
        const url=await Url.findOneAndUpdate(
            {shortUrl},
            {$inc:{clicks:1}},
            {new:true}
        );

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