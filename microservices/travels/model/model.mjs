class Travel {
    id
    countryName
    city
    links
    overview
    start_date
    end_date
    estimatedPrice

    constructor(obj) {
        Object.assign(this, obj)
    }
}

export {Travel}