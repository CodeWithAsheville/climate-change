kml_parts = Dir['kml/*'].map do |f|
  n = File.basename(f, '.kml')
  kml_xml = File.read(f)
  
  if kml_xml == "null"
    puts "skipping #{n}"
    next
  end
  
  "<Placemark><name>#{n}</name>#{kml_xml}</Placemark>"
end

File.write 'full.kml', %[<?xml version="1.0"?><kml><Document>#{kml_parts.join}</Document></kml>]