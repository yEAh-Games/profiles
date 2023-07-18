require 'open-uri'

module Jekyll
  class RemoteInclude < Liquid::Tag

    def initialize(tag_name, url, tokens)
      super
      @url = url.strip
    end

    def render(context)
      url = context[@url] || @url

      unless url =~ URI::regexp
        return "Invalid URL: #{url}"
      end

      content = URI.open(url).read

      template = Liquid::Template.parse(content)
      output = template.render(context)

      output
    end
  end
end

Liquid::Template.register_tag('remote_include', Jekyll::RemoteInclude)