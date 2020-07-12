import axios from 'axios';

const API_URL = "https://api-corona.azurewebsites.net/";

async function GetCountries() {
    return axios.get(API_URL + "country");
}

async function GetCovidInfo(country) {
    return axios.get(API_URL + 'country/' + country)
}

async function GetCovidTimeline(country) {
    return axios.get(API_URL + 'timeline/' + country)
}

export { GetCountries, GetCovidInfo, GetCovidTimeline };