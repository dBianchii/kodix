const fetch = require('node-fetch');
async function main() {
    //const lead_track = {
    //    name: inputData.name,
    //    email: inputData.email,
    //    tag_site: inputData.tag_site,
    //    tag: inputData.tag,
    //    city: inputData.city,
    //    phone_number: inputData.phone_number,
    //    utm_source: inputData.utm_source,
    //    utm_campaign: inputData.utm_campaign,
    //    utm_content: inputData.utm_content,
    //}
    const lead_track = {
        name: "inputData.name",
        email: "inputData.email",
        tag_site: "inputData.tag_site",
        tag: "inputData.tag",
        city: "inputData.city",
        phone_number: "inputData.phone_number",
        utm_source: "inputData.utm_source",
        utm_campaign: "inputData.utm_campaign",
        utm_content: "inputData.utm_content",
    }

    async function InsertLeadTrack() {
        const result = await fetch("http://localhost:3000/leadtrack/new", {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(lead_track)
            })
            .then(function(res) {
                return res
            })

        return result
    }

    var result;
    result = await InsertLeadTrack()
    if (result.status == 201) { //Created
        console.log('Inserted')
        return
    } else {
        console.log('Fail')
        console.log(result)

    }
}
main()