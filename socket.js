const db = require("./models");

module.exports = function(wss) {
	db.Transaction.addHook("afterDestroy", liveUpdate);
	db.Transaction.addHook("afterSave", liveUpdate);
	

	wss.on("connection", () => console.log("Socket connected"))

	function liveUpdate(inst, opts) {
		wss.emit("transactionChanged", inst.get({plain: true}));
	}
}