# Add Algolia Search to a Hugo site

this readme is a WIP.

## Backend

### Create search index

- Add JSON output to main 
```
[outputs]
home = ["HTML", "HEADERS", "REDIR", "JSON"]
```

- Add `index.json` to layouts 

```
{{- $.Scratch.Add "index" slice -}}
{{$content := where .Site.RegularPages ".Params.private" "ne" true}}
{{- range $content -}}
  {{- $.Scratch.Add "index" (dict "section" .Section "title" .Title "objectID" (md5 .File.Path) "date" (.Date.Format "January 2, 2006") "sort_date" .Date.Unix "uri" .RelPermalink "description" .Description "authors" .Params.authors "contributors" .Params.contributors  "content" (.Summary | truncate 500)) -}}
{{- end -}}
{{- $.Scratch.Get "index" | jsonify -}}

```

- Adjust fields as needed

### Create account/instance at Algolia

- Click "New Application" https://www.algolia.com/manage/applications
- Create a new index on the "indices" page. Call it `all_content`
- Retrieve App ID and Keys on API page

### Create Atomic Algolia Instance

- Clone this repo: https://github.com/chrisdmacrae/serverless-atomic-algolia

follow instructions there. You will need to use our Webhook

### Initiate Webhook

- After deploying webhook, retrieve the endpoint URL. It will look like this:
https://wt-1234567898765432123456789-0.sandbox.auth0-extend.com/atomic-algolia-THENAME

- Go to Netlify CP, Deploy| Deploy Notifications. 
- Add the URL as an Outgoing Webhook. Event to Listen for "Deploy Succeeded"

## Front end
