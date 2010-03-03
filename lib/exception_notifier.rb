##
# This is an exception notifier for Padrino::Application with
# redmine bonus feature.
# 
# ==== Usage
# 
#   class MyApp < Padrino::Application
#     register ExceptionNotifier
#     set :exceptions_from,    "errors@localhost.local"
#     set :exceptions_to,      "foo@bar.local"
#     set :exceptions_page,    :errors # => views/errors.haml/erb
#     set :redmine, :project => "My Bugs", :tracker => "Bugs", :priority => "High"
#   end
# 
module ExceptionNotifier
 
  def self.registered(app)
    app.set :exceptions_subject, "Exception"
    app.set :exceptions_to,      "errors@localhost.local"
    app.set :exceptions_from,    "foo@bar.local"
    app.set :redmine, {}
    app.error 500 do
      boom  = env['sinatra.error']
      body  = ["#{boom.class} - #{boom.message}:", *boom.backtrace].join("\n  ")
      logger.error body
      options.redmine.each { |k,v| body += "\n#{k.to_s.capitalize}: #{v}" }
      Padrino::Mailer::MailObject.new(
        :subject => "[#{options.exceptions_subject}] #{boom.class} - #{boom.message}",
        :to => options.exceptions_to,
        :from => options.exceptions_from,
        :body => body
      ).deliver
      response.status = 500
      content_type 'text/html', :charset => "utf-8"
      render options.exceptions_page
    end
  end
end