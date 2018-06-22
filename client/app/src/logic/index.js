const socialApi = require('social-api')

// socialApi.url = 'http://localhost:5000/api'
socialApi.url = "https://murmuring-hollows-20764.herokuapp.com/api"
const logic = {
    userId: 'NO-ID',
    cities: ['Alava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Avila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
        'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
        'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra',
        'Orense', 'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
        'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'],
    races: ["Others","Affenpinscher", "Afghan", "Aidi", "Airedale Terrier", "Akbash Dog", "Akita", "Alano Español", "Alaskan Klee Kai", "Alaskan Malamute", "Alpine Dachsbracke", "Alpine Spaniel", "American Bulldog", "American Cocker Spaniel", "American Eskimo Dog", "American Foxhound", "American Hairless Terrier", "American Pit Bull Terrier", "American Staffordshire Terrier", "American Water Spaniel", "Anglo-Français de Petite Vénerie", "Appenzeller Sennenhund", "Ariege Pointer", "Ariegeois", "Armant", "Armenian Gampr dog", "Artois Hound", "Australian Cattle Dog", "Australian Kelpie", "Australian Shepherd", "Australian Silky Terrier", "Australian Stumpy Tail Cattle Dog", "Australian Terrier", "Azawakh", "Bakharwal Dog", "Barbet", "Basenji", "Basque Shepherd Dog", "Basset Artésien Normand", "Basset Bleu de Gascogne", "Basset Fauve de Bretagne", "Basset Hound", "Bavarian Mountain Hound", "Beagle", "Beagle-Harrier", "Bearded Collie", "Beauceron", "Bedlington Terrier", "Belgian Shepherd Dog (Groenendael)", "Belgian Shepherd Dog (Laekenois)", "Belgian Shepherd Dog (Malinois)", "Bergamasco Shepherd", "Berger Blanc Suisse", "Berger Picard", "Berner Laufhund", "Bernese Mountain Dog", "Billy", "Black and Tan Coonhound", "Black and Tan Virginia Foxhound", "Black Norwegian Elkhound", "Black Russian Terrier", "Bloodhound", "Blue Lacy", "Blue Paul Terrier", "Boerboel", "Bohemian Shepherd", "Bolognese", "Border Collie", "Border Terrier", "Borzoi", "Boston Terrier", "Bouvier des Ardennes", "Bouvier des Flandres", "Boxer", "Boykin Spaniel", "Bracco Italiano", "Braque d'Auvergne", "Braque du Bourbonnais", "Braque du Puy", "Braque Francais", "Braque Saint-Germain", "Brazilian Terrier", "Briard", "Briquet Griffon Vendéen", "Brittany", "Broholmer", "Bruno Jura Hound", "Bucovina Shepherd Dog", "Bull and Terrier", "Bull Terrier (Miniature)", "Bull Terrier", "Bulldog", "Bullenbeisser", "Bullmastiff", "Bully Kutta", "Burgos Pointer", "Cairn Terrier", "Canaan Dog", "Canadian Eskimo Dog", "Cane Corso", "Cardigan Welsh Corgi", "Carolina Dog", "Carpathian Shepherd Dog", "Catahoula Cur", "Catalan Sheepdog", "Caucasian Shepherd Dog", "Cavalier King Charles Spaniel", "Central Asian Shepherd Dog", "Cesky Fousek", "Cesky Terrier", "Chesapeake Bay Retriever", "Chien Français Blanc et Noir", "Chien Français Blanc et Orange", "Chien Français Tricolore", "Chien-gris", "Chihuahua", "Chilean Fox Terrier", "Chinese Chongqing Dog", "Chinese Crested Dog", "Chinese Imperial Dog", "Chinook", "Chippiparai", "Chow Chow", "Cierny Sery", "Cimarrón Uruguayo", "Cirneco dell'Etna", "Clumber Spaniel", "Combai", "Cordoba Fighting Dog", "Coton de Tulear", "Cretan Hound", "Croatian Sheepdog", "Cumberland Sheepdog", "Curly Coated Retriever", "Cursinu", "Cão da Serra de Aires", "Cão de Castro Laboreiro", "Cão Fila de São Miguel", "Dachshund", "Dalmatian", "Dandie Dinmont Terrier", "Danish Swedish Farmdog", "Deutsche Bracke", "Doberman Pinscher", "Dogo Argentino", "Dogo Cubano", "Dogue de Bordeaux", "Drentse Patrijshond", "Drever", "Dunker", "Dutch Shepherd Dog", "Dutch Smoushond", "East Siberian Laika", "East-European Shepherd", "Elo", "English Cocker Spaniel", "English Foxhound", "English Mastiff", "English Setter", "English Shepherd", "English Springer Spaniel", "English Toy Terrier (Black &amp; Tan)", "English Water Spaniel", "English White Terrier", "Entlebucher Mountain Dog", "Estonian Hound", "Estrela Mountain Dog", "Eurasier", "Field Spaniel", "Fila Brasileiro", "Finnish Hound", "Finnish Lapphund", "Finnish Spitz", "Flat-Coated Retriever", "Formosan Mountain Dog", "Fox Terrier (Smooth)", "French Bulldog", "French Spaniel", "Galgo Español", "Gascon Saintongeois", "German Longhaired Pointer", "German Pinscher", "German Shepherd", "German Shorthaired Pointer", "German Spaniel", "German Spitz", "German Wirehaired Pointer", "Giant Schnauzer", "Glen of Imaal Terrier", "Golden Retriever", "Gordon Setter", "Gran Mastín de Borínquen", "Grand Anglo-Français Blanc et Noir", "Grand Anglo-Français Blanc et Orange", "Grand Anglo-Français Tricolore", "Grand Basset Griffon Vendéen", "Grand Bleu de Gascogne", "Grand Griffon Vendéen", "Great Dane", "Great Pyrenees", "Greater Swiss Mountain Dog", "Greek Harehound", "Greenland Dog", "Greyhound", "Griffon Bleu de Gascogne", "Griffon Bruxellois", "Griffon Fauve de Bretagne", "Griffon Nivernais", "Hamiltonstövare", "Hanover Hound", "Hare Indian Dog", "Harrier", "Havanese", "Hawaiian Poi Dog", "Himalayan Sheepdog", "Hokkaido", "Hovawart", "Huntaway", "Hygenhund", "Ibizan Hound", "Icelandic Sheepdog", "Indian pariah dog", "Indian Spitz", "Irish Red and White Setter", "Irish Setter", "Irish Terrier", "Irish Water Spaniel", "Irish Wolfhound", "Istrian Coarse-haired Hound", "Istrian Shorthaired Hound", "Italian Greyhound", "Jack Russell Terrier", "Jagdterrier", "Jämthund", "Kai Ken", "Kaikadi", "Kanni", "Karelian Bear Dog", "Karst Shepherd", "Keeshond", "Kerry Beagle", "Kerry Blue Terrier", "King Charles Spaniel", "King Shepherd", "Kintamani", "Kishu", "Komondor", "Kooikerhondje", "Koolie", "Korean Jindo Dog", "Kromfohrländer", "Kumaon Mastiff", "Kurī", "Kuvasz", "Kyi-Leo", "Labrador Husky", "Labrador Retriever", "Lagotto Romagnolo", "Lakeland Terrier", "Lancashire Heeler", "Landseer", "Lapponian Herder", "Large Münsterländer", "Leonberger", "Lhasa Apso", "Lithuanian Hound", "Longhaired Whippet", "Löwchen", "Mahratta Greyhound", "Maltese", "Manchester Terrier", "Maremma Sheepdog", "McNab", "Mexican Hairless Dog", "Miniature American Shepherd", "Miniature Australian Shepherd", "Miniature Fox Terrier", "Miniature Pinscher", "Miniature Schnauzer", "Miniature Shar Pei", "Molossus", "Montenegrin Mountain Hound", "Moscow Watchdog", "Moscow Water Dog", "Mountain Cur", "Mucuchies", "Mudhol Hound", "Mudi", "Neapolitan Mastiff", "New Zealand Heading Dog", "Newfoundland", "Norfolk Spaniel", "Norfolk Terrier", "Norrbottenspets", "North Country Beagle", "Northern Inuit Dog", "Norwegian Buhund", "Norwegian Elkhound", "Norwegian Lundehund", "Norwich Terrier", "Old Croatian Sighthound", "Old Danish Pointer", "Old English Sheepdog", "Old English Terrier", "Old German Shepherd Dog", "Olde English Bulldogge", "Otterhound", "Pachon Navarro", "Paisley Terrier", "Pandikona", "Papillon", "Parson Russell Terrier", "Patterdale Terrier", "Pekingese", "Pembroke Welsh Corgi", "Perro de Presa Canario", "Perro de Presa Mallorquin", "Peruvian Hairless Dog", "Petit Basset Griffon Vendéen", "Petit Bleu de Gascogne", "Phalène", "Pharaoh Hound", "Phu Quoc ridgeback dog", "Picardy Spaniel", "Plott Hound", "Podenco Canario", "Pointer (dog breed)", "Polish Greyhound", "Polish Hound", "Polish Hunting Dog", "Polish Lowland Sheepdog", "Polish Tatra Sheepdog", "Pomeranian", "Pont-Audemer Spaniel", "Poodle", "Porcelaine", "Portuguese Podengo", "Portuguese Pointer", "Portuguese Water Dog", "Posavac Hound", "Pražský Krysařík", "Pudelpointer", "Pug", "Puli", "Pumi", "Pungsan Dog", "Pyrenean Mastiff", "Pyrenean Shepherd", "Rafeiro do Alentejo", "Rajapalayam", "Rampur Greyhound", "Rastreador Brasileiro", "Rat Terrier", "Ratonero Bodeguero Andaluz", "Redbone Coonhound", "Rhodesian Ridgeback", "Rottweiler", "Rough Collie", "Russell Terrier", "Russian Spaniel", "Russian tracker", "Russo-European Laika", "Sabueso Español", "Saint-Usuge Spaniel", "Sakhalin Husky", "Saluki", "Samoyed", "Sapsali", "Schapendoes", "Schillerstövare", "Schipperke", "Schweizer Laufhund", "Schweizerischer Niederlaufhund", "Scotch Collie", "Scottish Deerhound", "Scottish Terrier", "Sealyham Terrier", "Segugio Italiano", "Seppala Siberian Sleddog", "Serbian Hound", "Serbian Tricolour Hound", "Shar Pei", "Shetland Sheepdog", "Shiba Inu", "Shih Tzu", "Shikoku", "Shiloh Shepherd Dog", "Siberian Husky", "Silken Windhound", "Sinhala Hound", "Skye Terrier", "Sloughi", "Slovak Cuvac", "Slovakian Rough-haired Pointer", "Small Greek Domestic Dog", "Small Münsterländer", "Smooth Collie", "South Russian Ovcharka", "Southern Hound", "Spanish Mastiff", "Spanish Water Dog", "Spinone Italiano", "Sporting Lucas Terrier", "St. Bernard", "St. John's water dog", "Stabyhoun", "Staffordshire Bull Terrier", "Standard Schnauzer", "Stephens Cur", "Styrian Coarse-haired Hound", "Sussex Spaniel", "Swedish Lapphund", "Swedish Vallhund", "Tahltan Bear Dog", "Taigan", "Talbot", "Tamaskan Dog", "Teddy Roosevelt Terrier", "Telomian", "Tenterfield Terrier", "Thai Bangkaew Dog", "Thai Ridgeback", "Tibetan Mastiff", "Tibetan Spaniel", "Tibetan Terrier", "Tornjak", "Tosa", "Toy Bulldog", "Toy Fox Terrier", "Toy Manchester Terrier", "Toy Trawler Spaniel", "Transylvanian Hound", "Treeing Cur", "Treeing Walker Coonhound", "Trigg Hound", "Tweed Water Spaniel", "Tyrolean Hound", "Vizsla", "Volpino Italiano", "Weimaraner", "Welsh Sheepdog", "Welsh Springer Spaniel", "Welsh Terrier", "West Highland White Terrier", "West Siberian Laika", "Westphalian Dachsbracke", "Wetterhoun", "Whippet", "White Shepherd", "Wire Fox Terrier", "Wirehaired Pointing Griffon", "Wirehaired Vizsla", "Yorkshire Terrier", "Šarplaninac"
    ],

    /**
     * 
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @param {string} city 
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, email, password, city) {
        return socialApi.registerUser(name, email, password, city)
    },

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    login(email, password) {
        return socialApi.authenticateUser(email, password).then(data => {

            this.userId = data.data.id
            localStorage.setItem('id-app', data.data.id)
            return data
        })
    },


    /**
     * 
     * @param {string} userId 
     * 
     * @returns {Promise<boolean>}
     */
    retrieveUser(userId) {
        return socialApi.retrieveUser(userId)
    },

    /**
     * 
     * @param {string} name 
     * @param {string} email
     * @param {string} newEmail 
     * @param {string} password 
     * @param {string} race
     * @param {string} gender 
     * @param {string} description 
     * @param {string} photoProfile 
     * @param {string} birthdate 
     * @param {string} city 
     * @param {string} zip 
     * 
     * @returns {Promise<boolean>}
     */
    updateUser(name, email, newEmail, password, race, gender, description, photoProfile, birthdate, city, zip) {
        return socialApi.updateUser(localStorage.getItem('id-app'), name, email, password, newEmail, password, race, gender, description, photoProfile, birthdate, city, zip)
    },

     /**
     * 
     * @param {string} base64Image 
     * 
     * @returns {Promise<boolean>}
     */
    uploadImageProfile(base64Image) {
        return socialApi.uploadImageProfile(localStorage.getItem('id-app'), base64Image)
    },

     /**
     * 
     * @param {string} base64Image 
     * @param {string} descriptionImg 
     * 
     * @returns {Promise<boolean>}
     */
    uploadImageUser(base64Image,descriptionImg) {
        return socialApi.uploadImageUser(localStorage.getItem('id-app'), base64Image,descriptionImg)
    },

    /**
     *  
     * @returns {boolean}
     */
    isLogged() {
        return localStorage.getItem("token") ? true : false
    },

    /**
     * 
     * @param {string} name 
     * @param {string} race 
     * @param {string} gender 
     * @param {string} city 
     * 
     * @returns {Promise<array>}
     */
    search(name, race, gender, city) {
        if (race === "All") race = undefined
        if (gender === "All") gender = undefined
        if (city === "All") city = undefined

        return socialApi.searchUser(name, race, gender, city)
    },


    /**
     * 
     * @param {string} idUser 
     * @param {string} idFriend 
     * 
     * @returns {Promise<string>}
     */
    acceptFriendship(idUser, idFriend) {
        return socialApi.requestFriendship(idUser, idFriend)
    },


    /**
     * 
     * @param {string} idFriend 
     * @param {string} idUser 
     * @param {string} type 
     * 
     * @returns {Promise<boolean>}
     */
    sendNotifactionRelationship(idFriend, idUser, type) {

        return this.retrieveUser(idUser)
        .then(({name})=>{

            const notification = `${name}#${type}${idUser}`
            return socialApi.addNotification(idFriend, notification)

        })

        
    },


    /**
     * 
     * @param {string} notifications 
     * 
     * @returns {Promise<string>}
     */
    getNotifications(notifications) {

        let newNotifications = []

        notifications.forEach(n => {
            //jhon#friendship:5b1bda1968b97485c0ac9cc0
            let slack = n.indexOf("#")
            let colon = n.indexOf(":")
            let notification = {}

            notification.type = n.substring(slack, colon)
            notification.id = n.substring(colon + 1, n.length)
            notification.user=n.substring(0,slack)

            if (n.substring(slack+1, colon) === "friendship") {
                notification.notification = "wants to be your friend."                
            }
            else if (n.substring(slack+1, colon) === "relationship") {
                notification.notification = "wants to be your lover."  
            }
            else if (n.substring(slack+1, colon) === "acceptFriendship") {
                notification.notification = "has accepted your friend request."  
            }
            newNotifications.push(notification)
        })
        return  newNotifications
    },

    /**
     *  
     * @returns {Promise<boolean>}
     */
    deleteNotifications(){

        return socialApi.deleteNotifications(localStorage.getItem('id-app'))
    },


    /**
     * 
     * @param {Date} birthday 
     * 
     * @returns {string}
     */
    getAge(birthday){

        if(birthday){

            birthday = new Date(birthday)
            let today = new Date();
            var years = today.getFullYear() - birthday.getFullYear()
            birthday.setFullYear(today.getFullYear())
            
            if(today < birthday)  years--;
            
            return (years<1)?"Months": years+" years" 
        }


    },

    logOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('id-app')
    }
}

module.exports = logic
