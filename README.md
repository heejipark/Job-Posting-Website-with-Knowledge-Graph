# Job Posting Website with Knowledge Graph


### Folder Detail
|Folder       |Description|
|-------------|-----------|
|Data_Collection|Include codes and collected dataset|
|Flask|Include files for web programming|
|KG_Construction|Conduct Entity Linking and construct KG for job posting|


### Code
|Code        |Description|
|------------|-----------|
|[Company Name Crawler](Data_Collection/[Code]Company_information/company_name_crawler.ipynb)| Get a list of 500 companies from [this site, Zyxware]('https://www.zyxware.com/articles/4344/list-of-fortune-500-companies-and-their-websites')|
|[Crunchbase URL Crawler](Data_Collection/[Code]Company_information/crunchbase_url_from_google_search.ipynb)| In CrunchBase, the form of the URL containing each company's information is inconsistent and varied, so extract the relevant links by googling the <b>[Company name + CrunchBase]</b> keyword.|
|[Company information Crawler_from_Crunchbase](Data_Collection/[Code]Company_information/company_information_from_crunchbase.ipynb)|Extract the information of each company from Crunchbase.|
|[glassdoor URL Crawler](Data_Collection/[Code]Company_information/glassdoor_url_from_google_search.ipynb)| In Glassdoor, the form of the URL containing each company's information is inconsistent and varied, so extract the relevant links by googling the <b>[Company name + Glassdoor + Overview]</b> keyword.|
|[Company information Crawler_from_Glassdoor](Data_Collection/[Code]Company_information/company_information_from_glassdoor.ipynb)|Extract the information of each company from Glassdoor.|
|[Json_To_CSV](Data_Collection/[Code]Company_information/json_to_csv.ipynb)|Change the data format from .json to .csv|
|[KG Construction](KG_Construction/Entity_Resolution_Construct_KG_RDF.ipynb)| Do Entity Resolution and KG Constuction. |

### Datasets
|Datasets       |Description|
|---------------|-----------|
|companies.csv     | Contains 500 companies' name|
|crunchbase_url.csv| Contains the each company's Crunchbase URLs |
|crunchbase_companyInfo.csv| Contains 500 companies information extracted from Crunchbase. [CSV version]|
|crunchbase_companyInfo.json| Contains 500 companies information extracted from Crunchbase. [JSON verson]|
|glassdoor_url.csv| Contains the each company's Glassdoor Overview URLs |
|glassdoor_companyInfo.csv| Contains 500 companies information extracted from Glassdoor. [CSV version]|
|glassdoor_companyInfo.json| Contains 500 companies information extracted from Glassdoor. [JSON verson]|
|company1.ttl| KG about Company Information [KG for Company]|
|KG.ttl| KG about Company Information and Job postings [KG for Company & Job Postings]|
