var express = require("express");
var router = express.Router();
const multer = require("../helper/multer.profile");
let user_Controler = require("../controllers/crud_controler/user");
const marketFreezeMiddleware = require('../middleware/freeze');



router.post("/add-team/:userId",multer.any(),marketFreezeMiddleware,user_Controler.addTeam);
router.get('/market-status',user_Controler.market_Status);


router.patch("/status-Updated/:id",user_Controler.status_updated)
router.get("/selected-teamlist/:id",user_Controler.selected_teamlist)
router.get("/players",user_Controler.playerList);
router.post("/addPlayer/:userId",marketFreezeMiddleware,user_Controler.addPlayer);

router.get("/user/overall/:id",user_Controler.overrall);
router.get("/user/in-play-value/:id",user_Controler.in_play_value);
router.get("/user/profile/:id",user_Controler.userProfile);

router.get("/faqs",user_Controler.faqList);


router.get("/userList",user_Controler.userList) 
router.post("/updateTeam/:userId",marketFreezeMiddleware,user_Controler.playerBuy);
router.patch("/sell-player/:userId",marketFreezeMiddleware,user_Controler.sellPlayer)



module.exports = router;
35.200.147.33 par site
35.200.147.33/api par backend
admin.imageenhance.in par admin ok done 
have mare admin ma api change ny krvi pade url ha 35.200.147.33/api aa muki ne update kari dejo admin ma build nthi banavu to direct process krvani
admin ma url change kari etle build to banavij pade ok