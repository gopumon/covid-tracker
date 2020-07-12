import React, { useState, useEffect, useRef } from 'react'
import moment from 'moment'
import { select, line, curveCardinal, axisBottom, axisLeft, scaleLinear, scaleOrdinal, scaleTime, max, extent } from 'd3'

const Timeline = (props) => {

    const { country, fetchTimeLine } = props
    const [timeline, setTimeline] = useState([])
    const graph = useRef()

    useEffect(() => {
        if (country)
            fetchTimeLine(country).then(res => {
                let timeLine = res.data.slice(-60);
                setTimeline(timeLine);
            }).catch(
                err => console.log(err)
            )
    }, [fetchTimeLine, country])

    useEffect(() => {
        if (timeline.length > 0) {

            let mapData = []

            timeline.forEach((day) => {
                let data = {}
                data.cnf = day.Confirmed
                data.act = parseInt(day.Confirmed - day.Deaths - day.Recovered)
                data.rec = day.Recovered
                data.det = day.Deaths
                data.x = moment(day.Date, 'MM-DD-YYYY').format('YYYY-MM-DD')
                mapData.push(data);
            })

            renderGraph(mapData)
        }
    }, [timeline])

    function renderGraph(data) {
        // Ref SVG Element
        const tlGraph = select(graph.current)

        //Clean slate protocol ;)
        tlGraph.selectAll("*").remove()

        const xValue = d => new Date(d.x)
        const cnfValue = d => d.cnf
        const actValue = d => d.act
        const recValue = d => d.rec
        const detValue = d => d.det


        const xScale = scaleTime().domain(extent(data, xValue)).range([50, 750]).nice()

        const yScale = scaleLinear().domain([0, max(data, cnfValue)]).range([410, 20]).nice()

        const xAx = axisBottom(xScale).ticks(10)
        const yAx = axisLeft(yScale)

        const cnfLine = line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(cnfValue(d)))
            .curve(curveCardinal)

        const actLine = line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(actValue(d)))
            .curve(curveCardinal)

        const recLine = line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(recValue(d)))
            .curve(curveCardinal)

        const detLine = line()
            .x(d => xScale(xValue(d)))
            .y(d => yScale(detValue(d)))
            .curve(curveCardinal)

        const chart = tlGraph.append('g')

        chart.append('g')
            .attr("transform", "translate(0, 410)")
            .call(xAx)
        chart.append('g')
            .attr("transform", "translate(50,0)")
            .call(yAx)

        chart.append('g')
            .append('path')
            .join('path')
            .attr('d', cnfLine(data))
            .attr('class', 'line cnf')

        chart.append('g')
            .append('path')
            .join('path')
            .attr('d', actLine(data))
            .attr('class', 'line act')

        chart.append('g')
            .append('path')
            .join('path')
            .attr('d', recLine(data))
            .attr('class', 'line rec')

        chart.append('g')
            .append('path')
            .join('path')
            .attr('d', detLine(data))
            .attr('class', 'line det')

        // Legends
        const legendScale = scaleOrdinal().domain(['Confirmed', 'Active', 'Recovered', 'Deceased']).range(['#292ce0', '#e09729', '#148539', '#cf0808'])

        const renderLegend = (selection, props) => {
            const {
                legendScale,
                circleRadius,
                spacing,
                textOffset
            } = props;

            const groups = selection.selectAll('g')
                .data(legendScale.domain());
            const groupsEnter = groups
                .enter().append('g')
                .attr('class', 'tick');
            groupsEnter
                .merge(groups)
                .attr('transform', (d, i) =>
                    `translate(${i * spacing}, 0)`
                );
            groups.exit().remove();

            groupsEnter.append('circle')
                .merge(groups.select('circle'))
                .attr('r', circleRadius)
                .attr('fill', legendScale);

            groupsEnter.append('text')
                .merge(groups.select('text'))
                .text(d => d)
                .attr('dy', '0.32em')
                .attr('x', textOffset);
        }

        chart.append('g')
            .attr("transform", "translate(90, 440)")
            .call(renderLegend, {
                legendScale,
                circleRadius: 5,
                spacing: 80,
                textOffset: 10
            })

    }

    return (
        <div className="TimeLine">
            <h3>For last two months</h3>
            <svg viewBox="0 0 800 450" ref={graph} className="tlGraph"></svg>
        </div>
    )
}

export default Timeline

