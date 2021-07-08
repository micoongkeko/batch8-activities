# Working code for strings, not working for numbers
def unique_in_order(sequence)
    result = []
    sequence.each_char { |c| 
    if result[-1] != c
        result << c  
    end
    }
    p result
end

# Best Answer (still absorbing)
def unique_in_order_two(iterable)
    (iterable.is_a?(String) ? iterable.chars : iterable).chunk { |x| x }.map(&:first)
  end