// load data with d3.js
var job_data = {};

var all_companies = [];
var selected_company = [];
var selected_jobType = [];
var selected_area = [];


d3.csv('./static/job_data.csv').then(function (data) {
    job_data = data;
    // console.log(job_data)
    for (var i = 0; i < job_data.length; i++) {
        if (all_companies.includes(job_data[i].Company)) {
            continue;
        } else {
            all_companies.push(job_data[i].Company);
        }
    }
    // console.log(all_companies);
})

function update(data, company_lst, jobType_lst, area_lst) {
    var new_data = data;
    if (company_lst.length != 0) {
        var temp = [];
        for (var i = 0; i < new_data.length; i++) {
            if (company_lst.includes(new_data[i].Company)) {
                temp.push(new_data[i])
            }
        }
        new_data = temp;
    }
    if (jobType_lst.length != 0) {
        var temp = [];
        for (var i = 0; i < new_data.length; i++) {
            if (jobType_lst.includes(new_data[i].Job_Type)) {
                temp.push(new_data[i])
            }
        }
        new_data = temp;
    }
    if (area_lst.length != 0) {
        var temp = [];
        for (var i = 0; i < new_data.length; i++) {
            if (area_lst.includes(new_data[i].State)) {
                temp.push(new_data[i])
            }
        }
        new_data = temp;
    }

    return new_data;
}

function get_options_value(data, name) {
    var values = [];
    if (name == 'Company') {
        for (var i = 0; i < data.length; i++) {
            if (values.includes(data[i].Company)) {
                continue;
            } else {
                values.push((data[i].Company))
            }
        }
    }
    if (name == 'Job_Type') {
        for (var i = 0; i < data.length; i++) {
            if (values.includes(data[i].Job_Type)) {
                continue;
            } else {
                values.push((data[i].Job_Type))
            }
        }
    }
    if (name == 'State') {
        for (var i = 0; i < data.length; i++) {
            if (values.includes(data[i].State)) {
                continue;
            } else {
                values.push((data[i].State))
            }
        }
    }
    values.sort()
    return values
}

// get elements
let company_1 = document.getElementById("company_1");
let company_2 = document.getElementById("company_2");
let company_3 = document.getElementById("company_3");


let jobType_1 = document.getElementById("job_type_1");
let jobType_2 = document.getElementById("job_type_2");
let jobType_3 = document.getElementById("job_type_3");

let area_1 = document.getElementById("area_1");
let area_2 = document.getElementById("area_2");
let area_3 = document.getElementById("area_3");

let filter_by_company = document.getElementById("filter_by_company");
let filter_by_job_type = document.getElementById("filter_by_job_type");
let filter_by_area = document.getElementById("filter_by_area")


let company_submit_btn = document.getElementById('submit_company')
let job_type_submit_btn = document.getElementById('submit_job_type')
let area_submit_btn = document.getElementById('submit_area')

let refresh_btn = document.getElementById('refresh')
let submit_all_btn = document.getElementById('submit_all')

// when initialize, set all filters to be disabled
company_1.disabled = true;
company_2.disabled = true;
company_3.disabled = true;
company_submit_btn.disabled = true;

jobType_1.disabled = true;
jobType_2.disabled = true;
jobType_3.disabled = true;
job_type_submit_btn.disabled = true;

area_1.disabled = true;
area_2.disabled = true;
area_3.disabled = true;
area_submit_btn.disabled = true;


filter_by_company.onclick = function () {
    if (filter_by_company.checked == true) {

        filter_by_job_type.disabled = true;
        filter_by_area.disabled = true;

        console.log('clicked')
        company_1.disabled = false;
        company_submit_btn.disabled = false;

        // initialize company_1 options
        var options = get_options_value(job_data, "Company")
        console.log(options)
        // add new options to company_2
        for (var i = 0; i < options.length; i++) {
            var opt = document.createElement('option');
            opt.value = options[i];
            opt.innerHTML = options[i];
            company_1.appendChild(opt);
        }

    }
    else {
        company_1.disabled = true;
        company_2.disabled = true;
        company_3.disabled = true;
        company_submit_btn.disabled = true;
    }
}

filter_by_job_type.onclick = function () {
    if (filter_by_job_type.checked == true) {
        filter_by_company.disabled = true;
        filter_by_area.disabled = true;
        jobType_1.disabled = false;
        job_type_submit_btn.disabled = false;

        // initialize jobType_1 options
        var options = get_options_value(job_data, "Job_Type")

        console.log('The new job data after company selection is: ', job_data)
        // add new options to company_2
        for (var i = 0; i < options.length; i++) {
            var opt = document.createElement('option');
            opt.value = options[i];
            opt.innerHTML = options[i];
            jobType_1.appendChild(opt);
        }
    }
    else {
        jobType_1.disabled = true;
        jobType_2.disabled = true;
        jobType_3.disabled = true;
        job_type_submit_btn.disabled = true;
    }
}

filter_by_area.onclick = function () {
    if (filter_by_area.checked == true) {
        filter_by_company.disabled = true;
        filter_by_job_type.disabled = true;

        area_1.disabled = false;
        area_submit_btn.disabled = false;

        // initialize company_1 options
        var options = get_options_value(job_data, "State")
        // add new options to company_2
        for (var i = 0; i < options.length; i++) {
            var opt = document.createElement('option');
            opt.value = options[i];
            opt.innerHTML = options[i];
            area_1.appendChild(opt);
        }
    }
    else {
        area_1.disabled = true;
        area_2.disabled = true;
        area_3.disabled = true;
        area_submit_btn.disabled = true;
    }
}

var company_1_select;
var company_2_select;
var company_3_select;
var jobType_1_select;
var jobType_2_select;
var jobType_3_select;
var area_1_select;
var area_2_select;
var area_3_select;


company_1.onchange = function () {

    console.log('select company!')
    company_1_select = company_1.value;
    selected_company.push(company_1_select);
    company_1.disabled = true;
    company_2.disabled = false;
    // add new options to company_2
    for (var i = 0; i < company_1.length; i++) {
        if (company_1.options[i].value != company_1_select) {
            var opt = document.createElement('option');
            opt.value = company_1.options[i].value;
            opt.innerHTML = company_1.options[i].value;
            company_2.appendChild(opt);
        }
    }
}
company_2.onchange = function () {
    company_2_select = company_2.value;
    selected_company.push((company_2_select))
    company_2.disabled = true;
    company_3.disabled = false;
    // add new options to company_2
    for (var i = 0; i < company_2.length; i++) {
        if (company_2.options[i].value != company_1_select & company_2.options[i].value != company_2_select) {
            var opt = document.createElement('option');
            opt.value = company_2.options[i].value;
            opt.innerHTML = company_2.options[i].value;
            company_3.appendChild(opt);
        }
    }
}
company_3.onchange = function () {
    company_3_select = company_3.value;
    selected_company.push((company_3_select))
    company_3.disabled = true;
}

// job type selection change
jobType_1.onchange = function () {
    console.log('select job type!')
    jobType_1_select = jobType_1.value;
    selected_jobType.push(jobType_1_select)

    jobType_1.disabled = true;
    jobType_2.disabled = false;
    // add new options to company_2
    for (var i = 0; i < jobType_1.length; i++) {
        if (jobType_1.options[i].value != jobType_1_select) {
            var opt = document.createElement('option');
            opt.value = jobType_1.options[i].value;
            opt.innerHTML = jobType_1.options[i].value;
            jobType_2.appendChild(opt);
        }
    }
}
jobType_2.onchange = function () {
    jobType_2_select = jobType_2.value;
    selected_jobType.push((jobType_2_select));
    jobType_2.disabled = true;
    jobType_3.disabled = false;
    // add new options to company_2
    for (var i = 0; i < jobType_2.length; i++) {
        if (jobType_2.options[i].value != jobType_1_select & jobType_2.options[i].value != jobType_2_select) {
            var opt = document.createElement('option');
            opt.value = jobType_2.options[i].value;
            opt.innerHTML = jobType_2.options[i].value;
            jobType_3.appendChild(opt);
        }
    }
}
jobType_3.onchange = function () {
    jobType_3_select = jobType_3.value;
    selected_jobType.push((jobType_3_select));
    jobType_3.disabled = true;
}


// area selection part
area_1.onchange = function () {
    console.log('select area!')
    area_1_select = area_1.value;
    selected_area.push(area_1_select)
    area_1.disabled = true;
    area_2.disabled = false;
    // add new options to company_2
    for (var i = 0; i < area_1.length; i++) {
        if (area_1.options[i].value != area_1_select) {
            var opt = document.createElement('option');
            opt.value = area_1.options[i].value;
            opt.innerHTML = area_1.options[i].value;
            area_2.appendChild(opt);
        }
    }
}
area_2.onchange = function () {
    area_2_select = area_2.value;
    selected_area.push(area_2_select)
    area_2.disabled = true;
    area_3.disabled = false;
    // add new options to company_2
    for (var i = 0; i < area_2.length; i++) {
        if (area_2.options[i].value != area_1_select & area_2.options[i].value != area_2_select) {
            var opt = document.createElement('option');
            opt.value = area_2.options[i].value;
            opt.innerHTML = area_2.options[i].value;
            area_3.appendChild(opt);
        }
    }
}
area_3.onchange = function () {
    area_3_select = area_3.value;
    selected_area.push(area_3_select);
    area_3.disabled = true;
}


company_submit_btn.onclick = function (event) {
    event.preventDefault();

    // update
    job_data = update(job_data, selected_company, selected_jobType, selected_area);
    console.log('The selected companies are: ', selected_company)
    console.log('The updated data is: ', job_data)

    company_submit_btn.disabled = true;
    if (filter_by_company.checked == true & filter_by_company.disabled == false) {
        filter_by_company.disabled = true;
        company_1.disabled = true;
        company_2.disabled = true;
        company_3.disabled = true;
        // let other disabled but not checked to be able to choose
        if (filter_by_job_type.checked == false & filter_by_job_type.disabled == true) {
            filter_by_job_type.disabled = false;
        }
        if (filter_by_area.checked == false & filter_by_area.disabled == true) {
            filter_by_area.disabled = false;
        }
    }
}


job_type_submit_btn.onclick = function (event) {
    event.preventDefault();
    jobType_1.disabled = false;
    jobType_2.disabled = false;
    jobType_3.disabled = false;

    // update
    job_data = update(job_data, selected_company, selected_jobType, selected_area);
    console.log('The selected job types are: ', selected_jobType)

    job_type_submit_btn.disabled = true;
    if (filter_by_job_type.checked == true & filter_by_job_type.disabled == false) {
        filter_by_job_type.disabled = true;
        jobType_1.disabled = true;
        jobType_2.disabled = true;
        jobType_3.disabled = true;
        // let other disabled but not checked to be able to choose
        if (filter_by_company.checked == false & filter_by_company.disabled == true) {
            filter_by_company.disabled = false;
        }
        if (filter_by_area.checked == false & filter_by_area.disabled == true) {
            filter_by_area.disabled = false;
        }
    }
}

area_submit_btn.onclick = function (event) {
    event.preventDefault();
    area_1.disabled = false;
    area_2.disabled = false;
    area_3.disabled = false;

    // update
    job_data = update(job_data, selected_company, selected_jobType, selected_area);
    console.log('The selected states are: ', selected_area)

    area_submit_btn.disabled = true;
    if (filter_by_area.checked == true & filter_by_area.disabled == false) {
        filter_by_area.disabled = true;
        area_1.disabled = true;
        area_2.disabled = true;
        area_3.disabled = true;
        // let other disabled but not checked to be able to choose
        if (filter_by_job_type.checked == false & filter_by_job_type.disabled == true) {
            filter_by_job_type.disabled = false;
        }
        if (filter_by_company.checked == false & filter_by_company.disabled == true) {
            filter_by_company.disabled = false;
        }
    }
}

refresh_btn.onclick = function () {
    window.location.reload();
}


