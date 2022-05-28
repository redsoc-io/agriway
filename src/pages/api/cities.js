export default async function (req, res) {
    const response = await fetch("https://raw.githubusercontent.com/thatisuday/indian-cities-database/master/cities.json");
    const json = await response.json();
    res.status(200).json(json);
}