const Category = require("../models/category");
const Person = require("../models/person");
const slugField = require("../helpers/slugfield");

async function populate() {
    const count = await Category.count();

    if(count == 0) { 

        const categories = await Category.bulkCreate([
            { name: "Amirler",url: slugField("Amirler"), },
            { name: "Gardiyanlar",url: slugField("Gardiyanlar"), },
            { name: "Suclular",url: slugField("Suclular"), }
        ]);

        const persons = await Person.bulkCreate([
            {
                isim: "Efe DOGAN",
                url: slugField("Efe DOGAN"),
                altbaslik: "Amir, cezaevi sisteminde alınacak önemli kararlardan sorumlu, cezaevinde ki en üst mevkidir.",
                aciklama: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam ut. Atque voluptatibus pariatur, autem, maiores repellendus veniam tenetur, quo tempore accusantium officia commodi ea inventore excepturi modi reprehenderit labore Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis obcaecati tenetur vitae aut, unde magni consequatur facere qui provident quas, maxime exercitationem officia eligendi alias mollitia ut! Voluptate, dolorem!",
                resim: "1.jpg",
                anasayfa: true,
                onay: true
            },
            {
                isim: "Mert BAKIR",
                url: slugField("Mert BAKIR"),
                altbaslik: "Gardian, cezaevinde mahkumların sorun çıkarmaması, ve cezaevinin genel düzeninden sorumlu mevkidir.",
                aciklama: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam ut. Atque voluptatibus pariatur, autem, maiores repellendus veniam tenetur, quo tempore accusantium officia commodi ea inventore excepturi modi reprehenderit labore Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis obcaecati tenetur vitae aut, unde magni consequatur facere qui provident quas, maxime exercitationem officia eligendi alias mollitia ut! Voluptate, dolorem!",
                resim: "2.jpg",
                anasayfa: true,
                onay: true
            },
            {
                isim: "Eren ALAGOZ",
                url: slugField("Eren ALAGOZ"),
                altbaslik: "Gardian, cezaevinde mahkumların sorun çıkarmaması, ve cezaevinin genel düzeninden sorumlu mevkidir.",
                aciklama: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam ut. Atque voluptatibus pariatur, autem, maiores repellendus veniam tenetur, quo tempore accusantium officia commodi ea inventore excepturi modi reprehenderit labore Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis obcaecati tenetur vitae aut, unde magni consequatur facere qui provident quas, maxime exercitationem officia eligendi alias mollitia ut! Voluptate, dolorem!",
                resim: "3.jpg",
                anasayfa: true,
                onay: true
            },
            {
                isim: "Suçlu 1 Abbas Sülün",
                url: slugField("Suçlu 1"),
                altbaslik: "Abbas Sülün dikkat edilmesi gereken bir seri katildir. Diğer suçlulardan uakta bulunması önemlidir.",
                aciklama: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam ut. Atque voluptatibus pariatur, autem, maiores repellendus veniam tenetur, quo tempore accusantium officia commodi ea inventore excepturi modi reprehenderit labore Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis obcaecati tenetur vitae aut, unde magni consequatur facere qui provident quas, maxime exercitationem officia eligendi alias mollitia ut! Voluptate, dolorem!",
                resim: "4.jpg",
                anasayfa: false,
                onay: true
            }
            ,
            {
                isim: "Suçlu 2",
                url: slugField("Suçlu 2"),
                altbaslik: "Yüzünde ki masumiyete kesinlikle inanılması gereken bir suçludur. Madde kullanımı ve tadariği konusunda tecrübelidir.",
                aciklama: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam ut. Atque voluptatibus pariatur, autem, maiores repellendus veniam tenetur, quo tempore accusantium officia commodi ea inventore excepturi modi reprehenderit labore Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis obcaecati tenetur vitae aut, unde magni consequatur facere qui provident quas, maxime exercitationem officia eligendi alias mollitia ut! Voluptate, dolorem!",
                resim: "5.jpg",
                anasayfa: false,
                onay: true
            }
            ,
            {
                isim: "Suçlu 3",
                url: slugField("Suçlu 3"),
                altbaslik: "Hırsızlıktan içeriyye girmiştir. Kumar ve yasadışı bahis organizasyonları yürütmüştür.",
                aciklama: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam ut. Atque voluptatibus pariatur, autem, maiores repellendus veniam tenetur, quo tempore accusantium officia commodi ea inventore excepturi modi reprehenderit labore Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis obcaecati tenetur vitae aut, unde magni consequatur facere qui provident quas, maxime exercitationem officia eligendi alias mollitia ut! Voluptate, dolorem!",
                resim: "6.jpg",
                anasayfa: false,
                onay: true
            }
            ,
            {
                isim: "Suçlu 4",
                url: slugField("Suçlu 4"),
                altbaslik: "Adam yaralamadan içeri girmiştir ama mevsi müdafa olma ihtimalinden suçunda cezasında hafifletme almıştır.",
                aciklama: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam ut. Atque voluptatibus pariatur, autem, maiores repellendus veniam tenetur, quo tempore accusantium officia commodi ea inventore excepturi modi reprehenderit labore Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis obcaecati tenetur vitae aut, unde magni consequatur facere qui provident quas, maxime exercitationem officia eligendi alias mollitia ut! Voluptate, dolorem!",
                resim: "4.jpg",
                anasayfa: false,
                onay: true
            }
            ,
            {
                isim: "Suçlu 5",
                url: slugField("Suçlu 5"),
                altbaslik: "Telikelidir, üç kez hapisaneden kaçma teşebbüsünde bulunmuştur. Cinayetten dolayı içeri girmiştir.",
                aciklama: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam ut. Atque voluptatibus pariatur, autem, maiores repellendus veniam tenetur, quo tempore accusantium officia commodi ea inventore excepturi modi reprehenderit labore Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis obcaecati tenetur vitae aut, unde magni consequatur facere qui provident quas, maxime exercitationem officia eligendi alias mollitia ut! Voluptate, dolorem!",
                resim: "1.jpg",
                anasayfa: false,
                onay: true
            }
            ,
            {
                isim: "Suçlu 6",
                url: slugField("Suçlu 6"),
                altbaslik: "Tehlikelidir! Arkanızı dönmemeniz gerek bir suçlludur. Cinayetten içeri girmiştir.",
                aciklama: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos, ipsam ut. Atque voluptatibus pariatur, autem, maiores repellendus veniam tenetur, quo tempore accusantium officia commodi ea inventore excepturi modi reprehenderit labore Lorem ipsum dolor sit amet consectetur adipisicing elit. At facilis obcaecati tenetur vitae aut, unde magni consequatur facere qui provident quas, maxime exercitationem officia eligendi alias mollitia ut! Voluptate, dolorem!",
                resim: "2.jpg",
                anasayfa: false,
                onay: true
            }
        ]);

        await categories[0].addPerson(persons[0]);
        await categories[1].addPerson(persons[1]);
        await categories[1].addPerson(persons[2]);
        await categories[2].addPerson(persons[3]);
        await categories[2].addPerson(persons[4]);
        await categories[2].addPerson(persons[5]);
        await categories[2].addPerson(persons[6]);
        await categories[2].addPerson(persons[7]);
        await categories[2].addPerson(persons[8]);

    }

}

module.exports = populate;