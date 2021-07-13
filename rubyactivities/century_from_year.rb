def centuryFromYear(year)
    century = year/100
# dividing year by 100 returns an integer
    if century.to_i == year/100.0
        # adding a decimal to the 100 makes the result of the division a float
        p century
    else
        p century.truncate() + 1
    end
end

centuryFromYear(1705)
centuryFromYear(1900)
centuryFromYear(1601)
centuryFromYear(2000)

