class constants {
	constructor() {
		// env defaults
		this.ENV_HOST = "localhost";
		this.ENV_PORT = 3000;
		this.ENV_DBHOST = "localhost";
		this.ENV_DBUSER = "postgres";
		this.ENV_DBNAME = "postgres-db";
		this.ENV_DBPWD = "postgres";
		this.ENV_JWTSECRET = "allyourbasearebelongtous";

		// rates
		this.RATE_HOURLY = "hourly";
		this.RATE_DAILY = "daily";
		this.RATE_MONTHLY = "monthly";
		this.RATE_SPECIAL = "special";

		// days
		this.DAY_MONDAY = "monday";
		this.DAY_TUESDAY = "tuesday";
		this.DAY_WEDNESDAY = "wednesday";
		this.DAY_THURSDAY = "thursday";
		this.DAY_FRIDAY = "friday";
		this.DAY_SATURDAY = "saturday";
		this.DAY_SUNDAY = "sunday";
		this.DAY_WEEK_ARRAY = [this.DAY_SUNDAY, this.DAY_MONDAY, this.DAY_TUESDAY, this.DAY_WEDNESDAY, this.DAY_THURSDAY, this.DAY_FRIDAY, this.DAY_SATURDAY];

		this.ROLE_ADMIN = "super_admin";
		this.ROLE_SUPPORT = "admin_support";
		this.ROLE_FINANCE = "admin_finance";
		this.ROLE_OPERATIONS = "admin_operations";
		this.ROLE_TENANT_ADMIN = "admin_tenant";
		this.ROLE_SITE_ADMIN = "admin_site";
		this.ROLE_USER = "user";

		// status
		this.STATUS_ACTIVE = "ACTIVE";
		this.STATUS_DISABLED = "DISABLED";
		this.STATUS_REQUEST_DELETE = "REQUEST_DELETE";
		this.STATUS_PENDING_ACTIVATION = "PENDING_ACTIVATION"


		this.parseUserAgent = function(userAgentString) {
			let os = "Unknown OS";
			let browser = "Unknown Browser";
		
			// Detecting Operating System
			if (userAgentString.includes("Windows")) os = "Windows";
			else if (userAgentString.includes("Macintosh") || userAgentString.includes("Mac OS")) os = "macOS";
			else if (userAgentString.includes("iPhone")) os = "iPhone iOS";
			else if (userAgentString.includes("Android")) os = "Android";
			else if (userAgentString.includes("Linux")) os = "Linux";
			else if (userAgentString.includes("like Mac OS X")) os = "iOS";
		
			// Detecting Browser
			if (userAgentString.includes("Firefox")) browser = "Firefox";
			else if (userAgentString.includes("Chrome")) browser = "Chrome";
			else if (userAgentString.includes("Safari") && !userAgentString.includes("Chrome")) browser = "Safari";
			else if (userAgentString.includes("Edge")) browser = "Edge";
			else if (userAgentString.includes("MSIE") || userAgentString.includes("Trident")) browser = "Internet Explorer";
		
			return { os, browser };
		}
		
		// Example usage
		// const userAgentInfo = parseUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
		// console.log(userAgentInfo); // Returns { os: 'Windows', browser: 'Chrome' }
		
		this.getCountryNameFromCode = function(countryCode) {
			const countries = {

				'AF': 'Afghanistan',
				'AX': 'Aland Islands',
				'AL': 'Albania',
				'DZ': 'Algeria',
				'AS': 'American Samoa',
				'AD': 'Andorra',
				'AO': 'Angola',
				'AI': 'Anguilla',
				'AQ': 'Antarctica',
				'AG': 'Antigua And Barbuda',
				'AR': 'Argentina',
				'AM': 'Armenia',
				'AW': 'Aruba',
				'AU': 'Australia',
				'AT': 'Austria',
				'AZ': 'Azerbaijan',
				'BS': 'Bahamas',
				'BH': 'Bahrain',
				'BD': 'Bangladesh',
				'BB': 'Barbados',
				'BY': 'Belarus',
				'BE': 'Belgium',
				'BZ': 'Belize',
				'BJ': 'Benin',
				'BM': 'Bermuda',
				'BT': 'Bhutan',
				'BO': 'Bolivia',
				'BA': 'Bosnia And Herzegovina',
				'BW': 'Botswana',
				'BV': 'Bouvet Island',
				'BR': 'Brazil',
				'IO': 'British Indian Ocean Territory',
				'BN': 'Brunei Darussalam',
				'BG': 'Bulgaria',
				'BF': 'Burkina Faso',
				'BI': 'Burundi',
				'KH': 'Cambodia',
				'CM': 'Cameroon',
				'CA': 'Canada',
				'CV': 'Cape Verde',
				'KY': 'Cayman Islands',
				'CF': 'Central African Republic',
				'TD': 'Chad',
				'CL': 'Chile',
				'CN': 'China',
				'CX': 'Christmas Island',
				'CC': 'Cocos (Keeling) Islands',
				'CO': 'Colombia',
				'KM': 'Comoros',
				'CG': 'Congo',
				'CD': 'Congo, Democratic Republic',
				'CK': 'Cook Islands',
				'CR': 'Costa Rica',
				'CI': 'Cote D\'Ivoire',
				'HR': 'Croatia',
				'CU': 'Cuba',
				'CY': 'Cyprus',
				'CZ': 'Czech Republic',
				'DK': 'Denmark',
				'DJ': 'Djibouti',
				'DM': 'Dominica',
				'DO': 'Dominican Republic',
				'EC': 'Ecuador',
				'EG': 'Egypt',
				'SV': 'El Salvador',
				'GQ': 'Equatorial Guinea',
				'ER': 'Eritrea',
				'EE': 'Estonia',
				'ET': 'Ethiopia',
				'FK': 'Falkland Islands (Malvinas)',
				'FO': 'Faroe Islands',
				'FJ': 'Fiji',
				'FI': 'Finland',
				'FR': 'France',
				'GF': 'French Guiana',
				'PF': 'French Polynesia',
				'TF': 'French Southern Territories',
				'GA': 'Gabon',
				'GM': 'Gambia',
				'GE': 'Georgia',
				'DE': 'Germany',
				'GH': 'Ghana',
				'GI': 'Gibraltar',
				'GR': 'Greece',
				'GL': 'Greenland',
				'GD': 'Grenada',
				'GP': 'Guadeloupe',
				'GU': 'Guam',
				'GT': 'Guatemala',
				'GG': 'Guernsey',
				'GN': 'Guinea',
				'GW': 'Guinea-Bissau',
				'GY': 'Guyana',
				'HT': 'Haiti',
				'HM': 'Heard Island & Mcdonald Islands',
				'VA': 'Holy See (Vatican City State)',
				'HN': 'Honduras',
				'HK': 'Hong Kong',
				'HU': 'Hungary',
				'IS': 'Iceland',
				'IN': 'India',
				'ID': 'Indonesia',
				'IR': 'Iran, Islamic Republic Of',
				'IQ': 'Iraq',
				'IE': 'Ireland',
				'IM': 'Isle Of Man',
				'IL': 'Israel',
				'IT': 'Italy',
				'JM': 'Jamaica',
				'JP': 'Japan',
				'JE': 'Jersey',
				'JO': 'Jordan',
				'KZ': 'Kazakhstan',
				'KE': 'Kenya',
				'KI': 'Kiribati',
				'KR': 'Korea',
				'KW': 'Kuwait',
				'KG': 'Kyrgyzstan',
				'LA': 'Lao People\'s Democratic Republic',
				'LV': 'Latvia',
				'LB': 'Lebanon',
				'LS': 'Lesotho',
				'LR': 'Liberia',
				'LY': 'Libyan Arab Jamahiriya',
				'LI': 'Liechtenstein',
				'LT': 'Lithuania',
				'LU': 'Luxembourg',
				'MO': 'Macao',
				'MK': 'Macedonia',
				'MG': 'Madagascar',
				'MW': 'Malawi',
				'MY': 'Malaysia',
				'MV': 'Maldives',
				'ML': 'Mali',
				'MT': 'Malta',
				'MH': 'Marshall Islands',
				'MQ': 'Martinique',
				'MR': 'Mauritania',
				'MU': 'Mauritius',
				'YT': 'Mayotte',
				'MX': 'Mexico',
				'FM': 'Micronesia, Federated States Of',
				'MD': 'Moldova',
				'MC': 'Monaco',
				'MN': 'Mongolia',
				'ME': 'Montenegro',
				'MS': 'Montserrat',
				'MA': 'Morocco',
				'MZ': 'Mozambique',
				'MM': 'Myanmar',
				'NA': 'Namibia',
				'NR': 'Nauru',
				'NP': 'Nepal',
				'NL': 'Netherlands',
				'AN': 'Netherlands Antilles',
				'NC': 'New Caledonia',
				'NZ': 'New Zealand',
				'NI': 'Nicaragua',
				'NE': 'Niger',
				'NG': 'Nigeria',
				'NU': 'Niue',
				'NF': 'Norfolk Island',
				'MP': 'Northern Mariana Islands',
				'NO': 'Norway',
				'OM': 'Oman',
				'PK': 'Pakistan',
				'PW': 'Palau',
				'PS': 'Palestinian Territory, Occupied',
				'PA': 'Panama',
				'PG': 'Papua New Guinea',
				'PY': 'Paraguay',
				'PE': 'Peru',
				'PH': 'Philippines',
				'PN': 'Pitcairn',
				'PL': 'Poland',
				'PT': 'Portugal',
				'PR': 'Puerto Rico',
				'QA': 'Qatar',
				'RE': 'Reunion',
				'RO': 'Romania',
				'RU': 'Russian Federation',
				'RW': 'Rwanda',
				'BL': 'Saint Barthelemy',
				'SH': 'Saint Helena',
				'KN': 'Saint Kitts And Nevis',
				'LC': 'Saint Lucia',
				'MF': 'Saint Martin',
				'PM': 'Saint Pierre And Miquelon',
				'VC': 'Saint Vincent And Grenadines',
				'WS': 'Samoa',
				'SM': 'San Marino',
				'ST': 'Sao Tome And Principe',
				'SA': 'Saudi Arabia',
				'SN': 'Senegal',
				'RS': 'Serbia',
				'SC': 'Seychelles',
				'SL': 'Sierra Leone',
				'SG': 'Singapore',
				'SK': 'Slovakia',
				'SI': 'Slovenia',
				'SB': 'Solomon Islands',
				'SO': 'Somalia',
				'ZA': 'South Africa',
				'GS': 'South Georgia And Sandwich Isl.',
				'ES': 'Spain',
				'LK': 'Sri Lanka',
				'SD': 'Sudan',
				'SR': 'Suriname',
				'SJ': 'Svalbard And Jan Mayen',
				'SZ': 'Swaziland',
				'SE': 'Sweden',
				'CH': 'Switzerland',
				'SY': 'Syrian Arab Republic',
				'TW': 'Taiwan',
				'TJ': 'Tajikistan',
				'TZ': 'Tanzania',
				'TH': 'Thailand',
				'TL': 'Timor-Leste',
				'TG': 'Togo',
				'TK': 'Tokelau',
				'TO': 'Tonga',
				'TT': 'Trinidad And Tobago',
				'TN': 'Tunisia',
				'TR': 'Turkey',
				'TM': 'Turkmenistan',
				'TC': 'Turks And Caicos Islands',
				'TV': 'Tuvalu',
				'UG': 'Uganda',
				'UA': 'Ukraine',
				'AE': 'United Arab Emirates',
				'GB': 'United Kingdom',
				'US': 'United States',
				'UM': 'United States Outlying Islands',
				'UY': 'Uruguay',
				'UZ': 'Uzbekistan',
				'VU': 'Vanuatu',
				'VE': 'Venezuela',
				'VN': 'Viet Nam',
				'VG': 'Virgin Islands, British',
				'VI': 'Virgin Islands, U.S.',
				'WF': 'Wallis And Futuna',
				'EH': 'Western Sahara',
				'YE': 'Yemen',
				'ZM': 'Zambia',
				'ZW': 'Zimbabwe'
			}

			return countries[countryCode] || 'Unknown Country';
		}


	}
}

module.exports = new constants();