const fetch = require("node-fetch");

async function main() {

    const loginJson =
    {
        login: "Admin",
        password: "1234567890"
    }

    const lead_track = {
        name: "Eu sou legal",
        email: "inputData.email",
        tag_site: "tagasdwa",
        tag: "YEAAAA",
        city: "Ribeirao Rosa",
        phone_number: "321324234"
    }

    var accessToken = ""
    var refreshToken = ""
    async function InsertLeadTrack(accessToken) {
        const result = await fetch("https://jellyfish-app-hhlxm.ondigitalocean.app/leadtrack/new",
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                method: "POST",
                body: JSON.stringify(lead_track)
            })
            .then(function (res) {
                return res
            })

        return result
    }

    async function GetNewToken(refreshToken) {
        const result = await fetch("https://jellyfish-app-hhlxm.ondigitalocean.app/authenticate/token",
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({
                    token: refreshToken
                })
            })
            .then((res) => {
                return res
            })
        return result
    }

    async function Login() {
        var result = await fetch("https://jellyfish-app-hhlxm.ondigitalocean.app/authenticate/login",
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: "POST",
                body: JSON.stringify(loginJson)
            })
            .then((res) => {
                return res
            })
        return result
    }


    async function EntireProcess() {
        var result;
        result = await InsertLeadTrack(accessToken)
        if (result.status == 201) { //Created
            return
        }
        else {
            result = await GetNewToken(refreshToken)
            if (result.status == 200) { //Ok
                accessToken = (await result.json()).accessToken
                await InsertLeadTrack(accessToken)
            }
            else {
                var result = await Login()
                if (result.status == 200) {
                    var jsonResult = await result.json()
                    accessToken = jsonResult.accessToken
                    refreshToken = jsonResult.refreshToken
                    EntireProcess() // If we got here, retry everything again.
                }
            }
        }
    }
    EntireProcess()
    output = { accessToken: accessToken, refreshToken: refreshToken };
}
main()

//InsertLeadTrack("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTQwMTExMDksImV4cCI6MTY1NDAxMTEyOX0.eWbua0Guzzw_CZv67Sg6KC-uLm_OzSoOlqaz5bIdZ64")



//
