# Countries Data

> ## Performance Profiling
>
> Profiling was performed using React DevTools Profiler.

> ## Tested interactions:
>
> Sorting a column  
> Searching for a country  
> Selecting a year  
> Adding/removing columns

## Before optimization

> ## Sorting a column(population):
>
> **Commit Duration:** 1.6s
> **Render Duration:** 102.9ms
> **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)
>
> ### Screenshots:
>
> Flame Graph for sorting
> ![Flame Graph for sorting](./report/image-9.png)
> Ranked Chart for sorting
> ![Ranked Chart for sorting](./report/image-10.png)

> ## Searching for a country:
>
> **Commit Duration:** 1.2s  
> **Render Duration:** 4.7ms  
> **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)
>
> ### Screenshots:
>
> Flame Graph for search
> ![Flame Graph for search](./report/image-8.png)
> Ranked Chart for search
> ![Ranked Chart for search](./report/image-11.png)

> ## Selecting a year:
>
> **Commit Duration:** 3.1s  
> **Render Duration:** 129.5ms  
> **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)
>
> ### Screenshots:
>
> Flame Graph for year
> ![Flame Graph for year](./report/image-13.png)
> Ranked Chart for year
> ![Ranked Chart for year](./report/image-12.png)

> ## Adding/removing columns:
>
> **Commit Duration:** 3.2s  
> **Render Duration:** 106.5ms  
> **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)
>
> ### Screenshots:
>
> Flame Graph for columns
> ![Flame Graph for adding columns](./report/image-14.png)
> Ranked Chart for columns
> ![Ranked Chart for adding columns](./report/image-15.png)

## After optimization

> ## Sorting a column(population):
>
> **Commit Duration:** 0.8s
> **Render Duration:** 135.1ms
> **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)
>
> ### Screenshots:
>
> Flame Graph for sorting
> ![Flame Graph for sorting](./report/image-7.png)
> Ranked Chart for sorting
> ![Ranked Chart for sorting](./report/image-6.png)

> ## Searching for a country:
>
> **Commit Duration:** 1.2s  
> **Render Duration:** 3.4ms  
> **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)
>
> ### Screenshots:
>
> Flame Graph for search  
> ![Flame Graph for search](./report/image-4.png)
> Ranked Chart for search
> ![Ranked Chart for search](./report/image-5.png)

> ## Selecting a year:
>
> **Commit Duration:** 2.7s  
> **Render Duration:** 105.7ms  
> **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)
>
> ### Screenshots:
>
> Flame Graph for year
> ![Flame Graph for year](./report/image-2.png)
> Ranked Chart for year
> ![Ranked Chart for year](./report/image-3.png)

> ## Adding/removing columns:
>
> **Commit Duration:** 2.2s  
> **Render Duration:** 118.8ms  
> **Interactions:** Not recorded (Profiler did not capture explicit interactions, but commit and render times were analyzed instead)
>
> ### Screenshots:
>
> Flame Graph for columns
> ![Flame Graph for columns](./report/image.png)
> Ranked Chart for columns
> ![Ranked Chart for columns](./report/image-1.png)

> ## Conclusion:
>
> Looks like optimization reduced commit durations for heavy interactions like sorting, selecting a year, and adding/removing columns, resulting in faster overall UI updates, while light actions like search remained largely unaffected.
