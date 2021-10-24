# UNE Discord Calendar Bot

Discord bot to fetch calendar events and ping the server

---

### Steps

1. `GET` the latest UNE iCal
2. `Array.filter` iCal to show given date-range (e.g. today + 1 week from now)
3. Mutate the data to add custom labels and properties
4. `POST` to discord webhook URI big ole' object with expected parameters `{}`
5. Write a CRON that will run the app every week and ping the Channel with useful upcoming events for the (e.g.) week

### Useful Notes

- [Useful info on Decimal color code](https://birdie0.github.io/discord-webhooks-guide/structure/embed/color.html)

### What doesn't work

It would have been handy to be able to pre-filter using these query-params, like the UNE website does, but that would require parsing html. Easier to just fetch the iCal doc and parse that.

```txt
https://www.une.edu.au/connect/events?
queries_month_fquery_fromvalue[d]=1
&queries_month_fquery_fromvalue[m]=10
&queries_month_fquery_fromvalue[y]=2021
&queries_month_fquery_tovalue[d]=31
&queries_month_fquery_tovalue[m]=10
&queries_month_fquery_tovalue[y]=2021
&queries_landing_fquery=none
```
