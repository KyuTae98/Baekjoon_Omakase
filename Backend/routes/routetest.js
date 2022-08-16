const router = require('express').Router();

router.get('/test/:id', async (req,res) => {

	try{
		const userid = await req.params.id;

		return res.json({
			test: "test",
			description: "description",
			userid: userid,
			userid_: await req.params.id,
		});

	} catch(e){
		console.error(e);
		return res.status(500).json({
			error: e,
			errorString: e.toString(),
		});
	}
	
});

module.exports = router;