---
title: "error"
layout: archive
permalink: categories/error
author_profile: true
sidebar:
    nav: "docs"
---


{% assign posts = site.categories.error %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}