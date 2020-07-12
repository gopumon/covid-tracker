import React, { useState, useEffect } from 'react'


const Header = (props) => {
    const { icon, title, fetchCountries, onCountryChange } = props
    const [isLoading, toggleIsLoading] = useState(true)
    const [country, setCountry] = useState('')
    const [countries, setCountries] = useState([{
        "Country": "Loading Countries",
        "Slug": "",
        "ISO2": "X"
    }])

    useEffect(() => {
        fetchCountries().then(res => {
            let countries = res.data;
            countries.sort((a, b) => {
                let x = a.Country.toLowerCase()
                let y = b.Country.toLowerCase()
                if (x < y) return -1
                if (x > y) return 1
                return 0
            })
            setCountries(countries)
            setCountry('united-arab-emirates')
            toggleIsLoading(false)
        })
    }, [fetchCountries])

    useEffect(() => {
        if (country)
            onCountryChange(country)
    }, [onCountryChange, country])

    function handleCountryChange(e) {
        setCountry(e.target.value)
    }

    return (
        <div className="Heading">
            <div className="title">
                <img src={icon} alt="Icon" className="Icon" /> {title}
            </div>
            <div className="field">
                <div className="control">
                    <div className={`select ${isLoading ? 'is-loading' : ''}`}>
                        <select value={country} onChange={handleCountryChange}>
                            {countries.map((item, index) => (<option key={index} value={item.Slug}>{item.Country}</option>))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
