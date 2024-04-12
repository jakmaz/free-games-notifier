# Free Games Notifier 🎮🚀

## Overview

The Free Games Notifier is your ultimate tool to stay updated on all the latest free game offerings across multiple platforms! With a focus on delivering timely notifications directly to your preferred channel - never miss out on claiming your next favorite title. Whether you're a casual gamer or a hardcore enthusiast, this project ensures you're always in the loop with the best deals and free releases. 🌟

## Features

- **Multi-Platform Support** 🕹️: Tracks free games across various platforms.
- **Instant Notifications** 🔔: Sends out immediate alerts as soon as a new free game is available.
- **Customizable Channels** 📬: Choose your notification medium - Discord, Email, and more, to get the news where you want it.
- **Flexible Configuration** ⚙️: Easily configure which platforms to monitor and specify your notification preferences.
- **User-friendly Interface** 🌈: A simple yet powerful setup that gets you started in minutes.

### 🌍 Currently Supported Platforms and Notifiers 🚀

The Free Games Notifier currently supports the following platforms and notification channels to ensure you receive timely updates about free games. We are always working to expand this list based on user feedback and demand.

#### Platforms
- **Steam** 🕹️: Get alerts for free games, DLCs, and bundles available on Steam.

#### Notification Channels
- **Ntfy** 🔔: Send notifications through the Ntfy service, which can push messages directly to your devices.
- **Discord** 💬: Configure alerts to be sent to a specific Discord channel, ideal for community engagement and quick access.

We plan to add more platforms such as GOG, Epic Games Store, and Origin 🎮. Additionally, future updates will include support for other popular notification channels like Email 📧 and Slack 💼 to enhance accessibility and user preference compatibility.

👀 Stay tuned for updates and feel free to contribute to the expansion of our supported platforms and notifiers!

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/jakmaz/free-games-notifier.git
   cd free-games-notifier
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up configuration**

   Edit the `config/default.yaml` file to set up your platform preferences and notification channels.

4. **Run the application**

   ```bash
   npm build:start
   ```

## Configuration

Adjust the `config/default.yaml` to match your preferences. Here's an example for setting up Steam and using Ntfy for notifications:

```yaml
mainConfiguration:
  platforms:
    - Steam
  notificationChannel: Ntfy

settings:
  channelSettings:
    Ntfy:
      topic: free-games

  platformSettings:
    Steam:
      userPreferences:
        types: [games, dlcs, bundles]
```
For detailed configuration options, including how to set up different notification channels and platform-specific settings, please refer to our [Configuration Guide](/docs/CONFIGURATION.md).

## Contribution

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. 🙌

- Fork the Project
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the Branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

## License

Distributed under the Apache 2.0 License. See `LICENSE` and `NOTICE` for more information.

## Acknowledgements

- All the gamers and developers contributing to this project! 🌟
- The open-source community for continuous inspiration and support. 🤝
