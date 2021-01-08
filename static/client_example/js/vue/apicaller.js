
const handleError = (error, that) => {
	console.error(error);
	that.loading = false
	if (error.bodyText !== '') {
		that.$store.commit('msgText', `${error.statusText}: ${error.bodyText}`)
	} else {
		that.$store.commit('msgText', 'Error: empty response')
	}
}

export default {
	SubmitComment(that, req) {
		console.log('Request is ', req)
		that.$http.post("Postdata", JSON.stringify(req), { headers: { "content-type": "application/json" } }).then(result => {
			console.log('Call result ', result.data)
			that.loading = false
		}, error => {
			handleError(error, that)
		});
	},
}