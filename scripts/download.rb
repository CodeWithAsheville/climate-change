(0 .. 500).each do |i|
  puts i
  `wget http://climatedataapi.worldbank.org/climateweb/rest/v1/basin/kmlpart/1/#{i} -O kml/#{i}.kml`
end