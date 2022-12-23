// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 360 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;


function get_avg_salary(data, group_type) {
    res = []
    for (var i = 0; i < data.length; i++) {
        if (data[i].Salary_Type != 'Year') {
            continue;
        }
        var avg_salary = (parseFloat(data[i].Salary_LowerBound) + parseFloat(data[i].Salary_HigherBound)) / 2
        if (group_type == 'Company') {
            res.push({ 'Company': data[i].Company, 'avg_salary': avg_salary })
        }
        if (group_type == 'Job_Type') {
            res.push({ 'Job_Type': data[i].Job_Type, 'avg_salary': avg_salary })
        }
        if (group_type == 'State') {
            res.push({ 'State': data[i].State, 'avg_salary': avg_salary })
        }
    }
    return res
}

submit_all_btn.onclick = function (event) {
    // use d3.js to plot salary distribution for each criteria
    event.preventDefault();
    console.log(selected_company, selected_jobType, selected_area)
    var data_by_company = [];
    var data_by_jobType = [];
    var data_by_area = [];

    if (selected_company.length != 0) {
        var div = document.getElementById('my_dataviz_company'),
            h4 = document.createElement("h4");
        h4.textContent = "Salary distribution by Company";
        h4.style = "text-align: center"
        div.appendChild(h4);

        data_by_company = get_avg_salary(job_data, 'Company')
        var x_domain_min = Number.MAX_VALUE;
        var x_domain_max = Number.MIN_VALUE;
        for (var i = 0; i < data_by_company.length; i++) {
            if (data_by_company[i].avg_salary < x_domain_min) { x_domain_min = data_by_company[i].avg_salary; }
            if (data_by_company[i].avg_salary > x_domain_max) { x_domain_max = data_by_company[i].avg_salary; }

        }
        console.log(x_domain_min, x_domain_max)

        // set dimension of graph
        var margin = { top: 10, right: 30, bottom: 30, left: 40 };
        var width = 360 - margin.left - margin.right;
        var height = 300 - margin.top - margin.bottom;

        // append svg to the page
        var svg = d3.select('#my_dataviz_company')
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // X axis
        var x = d3.scaleLinear()
            .domain([x_domain_min, x_domain_max])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        // set the parameters for the histogram
        var histogram = d3.histogram()
            .value(function (d) { return +d.avg_salary; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(20); // then the numbers of bins
        var bins = [];
        var bin_all = [];
        for (var i = 0; i < selected_company.length; i++) {
            var bin = histogram(data_by_company.filter(function (d) { return d.Company == selected_company[i] }));
            bins.push(bin)
            for (var j = 0; j < bin.length; j++) {
                bin_all.push(bin[j]);
            }
        }
        console.log(bin_all)
        // Y axis
        var y = d3.scaleLinear()
            .range([height, 0]);
        y.domain([0, d3.max(bin_all, function (d) { return d.length; })]);
        svg.append("g")
            .call(d3.axisLeft(y));

        var colors = ["#69b3a2", "#404080", "#FF5733"]
        for (var i = 0; i < bins.length; i++) {
            svg.selectAll("rect" + String(i))
                .data(bins[i])
                .enter()
                .append("rect")
                .attr("x", 1)
                .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
                .attr("height", function (d) { return height - y(d.length); })
                .style("fill", colors[i])
                .style("opacity", 0.6)
        }

        // Handmade legend
        ys_value = [30, 60, 90]
        for (var i = 0; i < selected_company.length; i++) {
            svg.append("circle").attr("cx", 200).attr("cy", ys_value[i]).attr("r", 6).style("fill", colors[i])
            svg.append("text").attr("x", 220).attr("y", ys_value[i]).text(selected_company[i]).style("font-size", "15px")

        }

    }


    if (selected_jobType.length != 0) {
        data_by_jobType = get_avg_salary(job_data, 'Job_Type')
        var div = document.getElementById('my_dataviz_jobType'),
            h4 = document.createElement("h4");
        h4.textContent = "Salary distribution by Job Type";
        div.appendChild(h4);
        var x_domain_min = Number.MAX_VALUE;
        var x_domain_max = Number.MIN_VALUE;
        for (var i = 0; i < data_by_jobType.length; i++) {
            if (data_by_jobType[i].avg_salary < x_domain_min) { x_domain_min = data_by_jobType[i].avg_salary; }
            if (data_by_jobType[i].avg_salary > x_domain_max) { x_domain_max = data_by_jobType[i].avg_salary; }

        }
        console.log(x_domain_min, x_domain_max)

        // set dimension of graph
        var margin = { top: 10, right: 30, bottom: 30, left: 40 };
        var width = 360 - margin.left - margin.right;
        var height = 300 - margin.top - margin.bottom;

        // append svg to the page
        var svg = d3.select('#my_dataviz_jobType')
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // X axis
        var x = d3.scaleLinear()
            .domain([x_domain_min, x_domain_max])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        // set the parameters for the histogram
        var histogram = d3.histogram()
            .value(function (d) { return +d.avg_salary; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(20); // then the numbers of bins
        var bins = [];
        var bin_all = [];
        for (var i = 0; i < selected_jobType.length; i++) {
            var bin = histogram(data_by_jobType.filter(function (d) { return d.Job_Type == selected_jobType[i] }));
            bins.push(bin)
            for (var j = 0; j < bin.length; j++) {
                bin_all.push(bin[j]);
            }
        }
        console.log(bin_all)
        // Y axis
        var y = d3.scaleLinear()
            .range([height, 0]);
        y.domain([0, d3.max(bin_all, function (d) { return d.length; })]);
        svg.append("g")
            .call(d3.axisLeft(y));

        var colors = ["#69b3a2", "#404080", "#FF5733"]
        for (var i = 0; i < bins.length; i++) {
            svg.selectAll("rect" + String(i))
                .data(bins[i])
                .enter()
                .append("rect")
                .attr("x", 1)
                .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
                .attr("height", function (d) { return height - y(d.length); })
                .style("fill", colors[i])
                .style("opacity", 0.6)
        }

        // Handmade legend
        ys_value = [30, 60, 90]
        for (var i = 0; i < selected_jobType.length; i++) {
            svg.append("circle").attr("cx", 200).attr("cy", ys_value[i]).attr("r", 6).style("fill", colors[i])
            svg.append("text").attr("x", 220).attr("y", ys_value[i]).text(selected_jobType[i]).style("font-size", "15px")

        }

    }





    if (selected_area.length != 0) {
        data_by_area = get_avg_salary(job_data, 'State')
        var div = document.getElementById('my_dataviz_area'),
            h4 = document.createElement("h4");
        h4.textContent = "Salary distribution by State";
        div.appendChild(h4);
        var x_domain_min = Number.MAX_VALUE;
        var x_domain_max = Number.MIN_VALUE;
        for (var i = 0; i < data_by_area.length; i++) {
            if (data_by_area[i].avg_salary < x_domain_min) { x_domain_min = data_by_area[i].avg_salary; }
            if (data_by_area[i].avg_salary > x_domain_max) { x_domain_max = data_by_area[i].avg_salary; }

        }
        console.log(x_domain_min, x_domain_max)

        // set dimension of graph
        var margin = { top: 10, right: 30, bottom: 30, left: 40 };
        var width = 360 - margin.left - margin.right;
        var height = 300 - margin.top - margin.bottom;

        // append svg to the page
        var svg = d3.select('#my_dataviz_area')
            .append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // X axis
        var x = d3.scaleLinear()
            .domain([x_domain_min, x_domain_max])
            .range([0, width]);
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
        // set the parameters for the histogram
        var histogram = d3.histogram()
            .value(function (d) { return +d.avg_salary; })   // I need to give the vector of value
            .domain(x.domain())  // then the domain of the graphic
            .thresholds(20); // then the numbers of bins
        var bins = [];
        var bin_all = [];
        for (var i = 0; i < selected_area.length; i++) {
            var bin = histogram(data_by_area.filter(function (d) { return d.State == selected_area[i] }));
            bins.push(bin)
            for (var j = 0; j < bin.length; j++) {
                bin_all.push(bin[j]);
            }
        }
        console.log(bin_all)
        // Y axis
        var y = d3.scaleLinear()
            .range([height, 0]);
        y.domain([0, d3.max(bin_all, function (d) { return d.length; })]);
        svg.append("g")
            .call(d3.axisLeft(y));

        var colors = ["#69b3a2", "#404080", "#FF5733"]
        for (var i = 0; i < bins.length; i++) {
            svg.selectAll("rect" + String(i))
                .data(bins[i])
                .enter()
                .append("rect")
                .attr("x", 1)
                .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
                .attr("width", function (d) { return x(d.x1) - x(d.x0) - 1; })
                .attr("height", function (d) { return height - y(d.length); })
                .style("fill", colors[i])
                .style("opacity", 0.6)
        }

        // Handmade legend
        ys_value = [30, 60, 90]
        for (var i = 0; i < selected_area.length; i++) {
            svg.append("circle").attr("cx", 200).attr("cy", ys_value[i]).attr("r", 6).style("fill", colors[i])
            svg.append("text").attr("x", 220).attr("y", ys_value[i]).text(selected_area[i]).style("font-size", "15px")

        }

    }
}
