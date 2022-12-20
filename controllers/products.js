const Product = require("../models/product")

const getAllProducts = async (req, res) => {
    const { company, featured, name, sort, select } = req.query;
    const queryObject = {};
    if (company) {
        queryObject.company = company;
    }
    if (featured) {
        queryObject.featured = featured;
    }
    let apiData = Product.find(queryObject);
    if (sort) {
        let sortItems = sort.replace(",", " ");
        //queryObject.sort = sortItems;
        apiData = apiData.sort(sortItems);
    }
    if (select) {
        let selectItems = select.split(",").join(" ");
        //queryObject.sort = sortItems;
        apiData = apiData.select(selectItems);
    }
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);


    const products = await apiData.sort(sort);
    //res.status(200).json({ mgs: "I am getAllProducts" });
    res.status(200).json({ products, nbHits: products.length });
}

const getAllProductsTesting = async (req, res) => {
    res.status(200).json({ msg: "I am getAllProductsTesting" })
}

module.exports = { getAllProducts, getAllProductsTesting };