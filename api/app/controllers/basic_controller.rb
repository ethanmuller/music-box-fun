class BasicController < ApplicationController
  # For basic endpoints only (like the status page). This should be mostly empty.

  def home
    render json: { status: 'online'}
  end
end
