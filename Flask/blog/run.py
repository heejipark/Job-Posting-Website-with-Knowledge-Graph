
import os
from flask import Flask, render_template, request
import pandas as pd
import joblib
from rdflib import Graph
import re
from flask_wtf import FlaskForm
from wtforms import SelectField
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np


app = Flask(__name__)


g = Graph()
g.parse("static/KG3.ttl")

@app.route('/')
def index():
    dict = get_posting_for_first_page()
    return render_template("posting2.html", keyword = "", records=dict)

def get_company(company_name):
    query = """PREFIX myns: <http://dsci558.org/myprojectnamespace#>  \
               PREFIX rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>   \
               PREFIX schema: <https://schema.org/> \
               SELECT ?v ?o \
               WHERE { \
                        myns:%s ?v ?o . \
                     }"""%(company_name)
    result = g.query(query)
    info = []
    val = []
    for type, value in result:
        links = ['http://dsci558.org/myprojectnamespace#', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#', 'http://www.w3.org/2000/01/rdf-schema#','https://schema.org/']
        new_link = str(type)
        new_value = str(value)
        for link in links:
            if link in new_link or link in new_value:
                new_link = re.sub(link, "", new_link)
                new_value = re.sub(link, "", new_value)
        info.append(new_link)
        val.append(new_value)
    
    dict = {}
    for i in range(len(info)):
        dict[info[i]] = val[i]
    return dict


# Filter job posting using companies name
def get_posting_for_first_page():
    query = """PREFIX myns: <http://dsci558.org/myprojectnamespace#>  \
               PREFIX rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>   \
               PREFIX schema: <https://schema.org/> \
               SELECT ?company ?type ?language ?salaryHigh ?salaryLow ?salaryType ?soft ?state ?city ?score ?framework ?desc ?title ?application\
               WHERE { \
                        ?a myns:Company ?company. \
                        ?a myns:Job_Type ?type . \
                        ?a myns:Programming_Languages ?language . \
                        ?a myns:Salary_HigherBound ?salaryHigh . \
                        ?a myns:Salary_LowerBound ?salaryLow . \
                        ?a myns:Salary_Type ?salaryType . \
                        ?a myns:Soft_Requirements ?soft . \
                        ?a myns:State ?state . \
                        ?a myns:City ?city . \
                        ?a myns:Company_Score ?score . \
                        ?a myns:Framework_Requirements ?framework . \
                        ?a myns:Job_Description ?desc . \
                        ?a myns:Title ?title . \
                        ?a myns:Application_Link ?application . \
                     }"""
    result = g.query(query)
    columns = [str(v) for v in result.vars]
    df = pd.DataFrame(result, columns=columns)
    dict = df.to_dict('records')
    return dict

# Filter job posting using companies name
def get_posting_from_company(keyword_name):
    query = """PREFIX myns: <http://dsci558.org/myprojectnamespace#>  \
               PREFIX rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>   \
               PREFIX schema: <https://schema.org/> \
               SELECT ?company ?type ?language ?salaryHigh ?salaryLow ?salaryType ?soft ?state ?city ?score ?framework ?desc ?title ?application\
               WHERE { \
                        ?a myns:Company ?company. \
                        ?a myns:Job_Type ?type . \
                        ?a myns:Programming_Languages ?language . \
                        ?a myns:Salary_HigherBound ?salaryHigh . \
                        ?a myns:Salary_LowerBound ?salaryLow . \
                        ?a myns:Salary_Type ?salaryType . \
                        ?a myns:Soft_Requirements ?soft . \
                        ?a myns:State ?state . \
                        ?a myns:City ?city . \
                        ?a myns:Company_Score ?score . \
                        ?a myns:Framework_Requirements ?framework . \
                        ?a myns:Job_Description ?desc . \
                        ?a myns:Title ?title . \
                        ?a myns:Application_Link ?application . \
                        FILTER (LCASE(?company) = "%s")  \
                     }"""%(keyword_name.lower())
    result = g.query(query)
    columns = [str(v) for v in result.vars]
    df = pd.DataFrame(result, columns=columns)
    dict = df.to_dict('records')
    return dict

# Filter string
def get_posting_from_job_name(keyword_name):
    query = """PREFIX myns: <http://dsci558.org/myprojectnamespace#>  \
               PREFIX rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>   \
               PREFIX schema: <https://schema.org/> \
               SELECT ?company ?type ?language ?salaryHigh ?salaryLow ?salaryType ?soft ?state ?city ?score ?framework ?desc ?title ?application\
               WHERE { \
                        ?a myns:Company ?company. \
                        ?a myns:Job_Type ?type . \
                        ?a myns:Programming_Languages ?language . \
                        ?a myns:Salary_HigherBound ?salaryHigh . \
                        ?a myns:Salary_LowerBound ?salaryLow . \
                        ?a myns:Salary_Type ?salaryType . \
                        ?a myns:Soft_Requirements ?soft . \
                        ?a myns:State ?state . \
                        ?a myns:City ?city . \
                        ?a myns:Company_Score ?score . \
                        ?a myns:Framework_Requirements ?framework . \
                        ?a myns:Job_Description ?desc . \
                        ?a myns:Title ?title . \
                        ?a myns:Application_Link ?application . \
                        FILTER (LCASE(?type) = "%s")  \
                     } \
               """%(keyword_name.lower())
    result = g.query(query)
    columns = [str(v) for v in result.vars]
    df = pd.DataFrame(result, columns=columns)
    dict = df.to_dict('records')
    return dict

#ToDo - How to filter in List
def get_posting_from_skill(keyword_name):
    query = """PREFIX myns: <http://dsci558.org/myprojectnamespace#>  \
               PREFIX rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>   \
               PREFIX schema: <https://schema.org/> \
               SELECT ?company ?type ?language ?salaryHigh ?salaryLow ?salaryType ?soft ?state ?city ?score ?framework ?desc ?title ?application\
               WHERE { \
                        ?a myns:Company ?company. \
                        ?a myns:Job_Type ?type . \
                        ?a myns:Programming_Languages ?language . \
                        ?a myns:Salary_HigherBound ?salaryHigh . \
                        ?a myns:Salary_LowerBound ?salaryLow . \
                        ?a myns:Salary_Type ?salaryType . \
                        ?a myns:Soft_Requirements ?soft . \
                        ?a myns:State ?state . \
                        ?a myns:City ?city . \
                        ?a myns:Company_Score ?score . \
                        ?a myns:Framework_Requirements ?framework . \
                        ?a myns:Job_Description ?desc . \
                        ?a myns:Title ?title . \
                        ?a myns:Application_Link ?application . \
                        FILTER contains(LCASE(?language), "%s")  \
                     } \
               """%(keyword_name.lower())
    result = g.query(query)
    columns = [str(v) for v in result.vars]
    df = pd.DataFrame(result, columns=columns)
    print(df)
    dict = df.to_dict('records')
    return dict

def get_posting_from_location(keyword_name):
    query = """PREFIX myns: <http://dsci558.org/myprojectnamespace#>  \
               PREFIX rdfs: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>   \
               PREFIX schema: <https://schema.org/> \
               SELECT ?company ?type ?language ?salaryHigh ?salaryLow ?salaryType ?soft ?state ?city ?score ?framework ?desc ?title ?application\
               WHERE { \
                        ?a myns:Company ?company. \
                        ?a myns:Job_Type ?type . \
                        ?a myns:Programming_Languages ?language . \
                        ?a myns:Salary_HigherBound ?salaryHigh . \
                        ?a myns:Salary_LowerBound ?salaryLow . \
                        ?a myns:Salary_Type ?salaryType . \
                        ?a myns:Soft_Requirements ?soft . \
                        ?a myns:State ?state . \
                        ?a myns:City ?city . \
                        ?a myns:Company_Score ?score . \
                        ?a myns:Framework_Requirements ?framework . \
                        ?a myns:Job_Description ?desc . \
                        ?a myns:Title ?title . \
                        ?a myns:Application_Link ?application . \
                        FILTER (LCASE(?city) = "%s")  \
                     } \
               """%(keyword_name.lower())
    result = g.query(query)
    columns = [str(v) for v in result.vars]
    df = pd.DataFrame(result, columns=columns)
    dict = df.to_dict('records')
    return dict



# read preprocessed data from csv file
input_filepath = 'static/job_postion.csv'
df = pd.read_csv(input_filepath)

companies = sorted(list(set(list(df['Company']))))
job_types = sorted(list(set(list(df['Job_Type']))))
areas = sorted(list(set(list(df['State']))))


def plot_salary_hist_by_category(df:pd.DataFrame, category:str, category_lst:list, fig, idx):
    plot_by_category = []
    for name in category_lst:
        salary_lowerbound = np.asarray(df.loc[df[category]==name, 'Salary_LowerBound'])
        salary_higherbound = np.asarray(df.loc[df[category]==name, 'Salary_HigherBound'])
        avg_salary = (salary_lowerbound + salary_higherbound)/2
        plot_by_category.append(avg_salary)

    sns.set_style('darkgrid')
    colors = ["dodgerblue", 'orange', 'deeppink']
    # Plot
    ax = fig.add_subplot(2, 2, idx)
    # plt.figure(figsize=(10,7), dpi= 90)
    for idx,avg_salary in enumerate(plot_by_category):
        sns.histplot(avg_salary, color=colors[idx], kde=True,  label=category_lst[idx], ax=ax)
    plt.xlabel('Average Salary (Thousand per year)')
    plt.title(f'Distribution of Average Salary by {category}')
    plt.legend()
    return

# function 1
def get_salary_distribution(dataframe:pd.DataFrame, company_lst:list = None, \
                            jobType_lst:list = None, area_lst:list = None, 
                            salary_type:str='Year', post_duration:list=None):
    '''
    Input Parameters:
        company: The company name
        job_type: The type of jobs from the job type list
        area: The abbreviation of state | the city name 
        salary_type: Year | hour
        post_duration: the duration since the job was posted (days)

    Return:
        The distribution of estimated salary range based on the input filter criteria
    '''
    df_frames = []
    df = dataframe.copy(deep=True)

    # filter company
    if company_lst != None:
        df_frames = []
        for company in company_lst:
            temp_df = df[ df['Company'].apply(lambda x: company.lower() in x.lower()) ]
            if len(temp_df) > 0:
                df_frames.append(temp_df)
    if len(df_frames) > 0:
        df = pd.concat(df_frames)

    # filter job type
    if jobType_lst != None:
        temp_df = df[df['Job_Type'].isin(jobType_lst)]
        df = temp_df

    # filter area
    if area_lst != None:
        dataframe = []
        for area in area_lst:
            temp_df = df[ df['State'].apply(lambda x: area.lower() == x.lower()) ]
            if len(temp_df) > 0:
                df_frames.append(temp_df)
    if len(df_frames) > 0:
        df = pd.concat(df_frames)

    # filter salary
    df = df[df['Salary_Type'] == salary_type]

    # filter post duration
    if post_duration != None:
        df = df[ (df['Post_Duration'] >=post_duration[0]) & (df['Post_Duration'] <= post_duration[1])] 

    # print(set(df['State']))
    
    sns.set()
    fig = plt.figure(figsize=(20,15))
    fig.subplots_adjust(hspace=0.4, wspace=0.4)
    
    # Graph 1: plot histogram of estimated average salary by company
    if company_lst != None:
        plot_salary_hist_by_category(df,'Company', company_lst, fig,1)

    # Graph 2: plot histogram of estimated average salary by job_type
    if jobType_lst != None:
        plot_salary_hist_by_category(df, 'Job_Type', jobType_lst, fig,2)

    # Graph 3: plot histogram of estimated average salary by area
    if area_lst != None:
        plot_salary_hist_by_category(df, 'State', area_lst, fig,3)

    # plt.show()
    fig.savefig('./front-end/static/img.png')
    return


# define some parameters to filter data
selected_companies = []
selected_jobTypes = []
selected_areas = []


class company_form(FlaskForm):
    company_1 = SelectField('company_1', choices=[('None','None')])
    company_2 = SelectField('company_2', choices=[])
    company_3 = SelectField('company_3', choices=[])

class jobType_form(FlaskForm):
    job_type_1 = SelectField('job_type_1', choices=[('None','None')])
    job_type_2 = SelectField('job_type_2', choices=[])
    job_type_3 = SelectField('job_type_3', choices=[])

class area_form(FlaskForm):
    area_1 = SelectField('area_1', choices=[('None','None')])
    area_2 = SelectField('area_2', choices=[])
    area_3 = SelectField('area_3', choices=[])



@app.route('/salaryFilter', methods=["GET","POST"])
def get_salaray_distribution():
    form_1 = company_form()
    form_2 = jobType_form()
    form_3 = area_form()

    return render_template('index.html', form_1=form_1, form_2=form_2,form_3=form_3)



@app.route('/posting/', methods=['POST'])
def home_page():
    search_term = request.form['search_term']
    # software keyword
    if request.form['information_type'] == 'search_type':
        dict = get_posting_from_job_name(search_term)
        return render_template("posting2.html", keyword = search_term, records=dict)
    elif request.form['information_type'] == 'search_company':
        dict = get_posting_from_company(search_term)
        return render_template("posting2.html", keyword = search_term, records=dict)
    elif request.form['information_type'] == 'search_skill':
        dict = get_posting_from_skill(search_term)
        return render_template("posting2.html", keyword = search_term, records=dict)
    elif request.form['information_type'] == 'search_location':
        dict = get_posting_from_location(search_term)
        return render_template("posting2.html", keyword = search_term, records=dict)

@app.route('/company/<name>', methods=['GET'])
def post(name):
    rename = re.sub("[^1-9a-zA-Z&]", "_", name)
    dict = get_company(rename)
    df = pd.read_csv('static/similar_companies.csv')
    df = df.drop(columns=['Unnamed: 0'])
    similarDic = df[df['name'] == name].to_dict('records')

    reviewDF = pd.read_csv('static/review.csv')
    reviewDF = reviewDF.drop(columns=['Unnamed: 0'])
    reviewDF = reviewDF.dropna()
    reviewDF['Pros'] = reviewDF['Pros'].apply(lambda x: x.split('<br/>'))
    reviewDF['Cons'] = reviewDF['Cons'].apply(lambda x: x.split('<br/>'))
    reviewDic = reviewDF[reviewDF['name'] == name].to_dict('records')
    
    return render_template("company_info.html", company_name = name, records=dict, similar=similarDic, review=reviewDic)

if __name__ == '__main__':
    app.secret_key = os.urandom(24)
    app.run(debug=True)
