class Contact < MailForm::Base
  attribute :name , :validate => true
  attribute :email, :validate => /\A([\w\.%\+\-]+)@([\w\-]+\.)+([\w]{2,})\z/i
  attribute :number, :validate => true
  attribute :comment, :validate => true
  attribute :nickname, :captcha => true

  def headers
    {
      :subject => "Contact Form",
      :to => "jalenj@perfpr.com",
      :from => %("#{name}" <#{email}>)
    }
  end
end