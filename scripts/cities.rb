require 'csv'
require 'json'

csv = CSV.parse(File.read('data/cities.csv'))
range = (2 .. -1)

cities = csv.first[range]

city_h = cities.inject({}) do |h, c|
  h[c] = {}; h
end

months = (1 .. 12).to_a.inject([]) do |a, i|
  a << city_h.dup
end

csv[2 .. -2].each_with_index do |row, i|
  v = row[1]
  
  field = case i
    when 0 .. 11
      m = i
      :tmin
    when 13 .. 24
      m = i - 13
      :tavg
    when 26 .. 38
      m = i - 26
      :tmax
    when 39 .. 51
      m = i - 39
      :pre
    else
      next
  end
  
  puts "#{m} : #{field} : #{row[range].size == cities.size}"
  row[range].each_with_index do |v, ci|
    begin
      puts "#{cities[ci]} | #{months[m][cities[ci]].class} | #{ci} | #{v}"
      months[m][cities[ci]][field] = v
    rescue => e
      puts "ERROR: #{e.message}"
    end
  end
end

File.write('cities.json', months.to_json)