import React, { useState, useEffect } from 'react'
import moment from 'moment'

const Info = (props) => {

    const { country, fetchInfo } = props
    const [info, setInfo] = useState({})

    useEffect(() => {
        if (country)
            fetchInfo(country).then(res => {
                let infoObj = res.data.Summary
                delete infoObj.Country
                delete infoObj.Code
                delete infoObj.Slug
                delete infoObj.Timeline
                setInfo(infoObj)
            }).catch(
                err => console.log(err)
            );
    }, [fetchInfo, country])

    return (
        <div className="Info">
            <span className="update">Last updated at: {moment(info.Last_Update, 'YYYY-MM-DD HH:mm:ss Z').format('LLLL')}</span>
            <div className="infoData">
                <div className="confirmed">
                    <span>Confirmed</span>
                    {info.Confirmed}
                </div>
                <div className="active">
                    <span>Active</span>
                    {info.Active}
                </div>
                <div className="recovery">
                    <span>Recovery</span>
                    {info.Recovered}
                </div>
                <div className="death">
                    <span>Deceased</span>
                    {info.Deaths}
                </div>
            </div>
        </div>
    )
}

export default Info

