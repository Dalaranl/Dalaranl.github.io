---
title: "vanilla html"
layout: archive
permalink: categories/html
author_profile: true
sidebar:
    nav: "docs"
---


{% assign posts = site.categories.html %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}