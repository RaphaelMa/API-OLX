const { v4: uuid } = require('uuid');
const jimp = require('jimp');

const Category = require('../models/Category');
const User = require('../models/User');
const Ads = require('../models/Ads');

const addImage = async (buffer) => {
  let newName = `${uuid()}.jpg`;
  let tmpImg = await jimp.read(buffer);
  tmpImg.cover(500, 500).quality(80).write(`../../public${newName}`);
  console.log(tmpImg);
  return newName;
}

module.exports = {
  getCategories: async (req, res) => {
    const cats = await Category.find().exec();

    let categories = [];

    for (let i in cats) {
      categories.push({
        ...cats[i]._doc,
        img: `${process.env.BASE}/assets/images/${cats[i].slug}.png`
      });
    }

    res.json({ categories });
  },

  addAction: async (req, res) => {
    let { title, price, priceneg, desc, cat, token } = req.body;
    const user = await User.findOne({ token }).exec();

    if (!title || !cat) {
      res.json({ error: 'Titulo e/ou categoria não foram preenchidos' });
    }

    if (price) {
      price = price.replace('.', '').replace(',', '.').replace('R$ ', '');
      price = parseFloat(price);
    } else {
      price = 0;
    }

    const newAds = new Ads();
    newAds.status = true;
    newAds.idUser = user._id;
    newAds.state = user.state;
    newAds.dateCreated = new Date()
    newAds.title = title;
    newAds.category = cat;
    newAds.price = price;
    newAds.priceNegotiable = (priceneg == 'true') ? true : false;
    newAds.description = desc;
    newAds.views = 0;

    //Verify in one image or more images
    if (req.files && req.files.img) {
      if (req.files.img.length == undefined) {
        if (['image/jpeg', 'image/png', 'image/jpg'].includes(req.files.img.mimetypes)) {
          let url = await addImage(req.files.img.data);
          newAds.images.push({
            url,
            default: false
          })
        }
      } else {
        for (let i = 0; i < req.files.img.length; i++) {
          if (['image/jpeg', 'image/png', 'image/jpg'].includes(req.files.img[i].mimetypes)) {
            let url = await addImage(req.files.img[i].data);
            newAds.images.push({
              url,
              default: false
            })
          }
        }
      }
    }

    if (newAds.images.length > 0) {
      newAds.images[0].default = true;
    }

    const info = await newAds.save();
    res.json({ id: info._id });

  },

  getList: async (req, res) => { },

  getItem: async (req, res) => { },

  editAction: async (req, res) => { },
};