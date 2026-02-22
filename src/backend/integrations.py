"""
Enterprise integrations: Active Directory (AD) and API (AP) stubs.
Configure real AD/AP in production for SSO and progress sync.
"""

from flask import Blueprint, jsonify

integrations_bp = Blueprint('integrations', __name__, url_prefix='/api/integrations')


@integrations_bp.route('/active-directory/status', methods=['GET'])
def active_directory_status():
    """
    Active Directory integration status.
    In production: integrate with Microsoft AD/LDAP for enterprise SSO and user sync.
    """
    return jsonify({
        'enabled': False,
        'message': 'Active Directory integration can be enabled for enterprise SSO and user sync.',
        'docs': 'Configure AD/LDAP or Azure AD OAuth2 and set ACTIVE_DIRECTORY_* env vars.'
    })


@integrations_bp.route('/active-directory/config', methods=['GET'])
def active_directory_config():
    """Stub: return AD config requirements (no secrets)."""
    return jsonify({
        'requirements': [
            'LDAP server URL or Azure AD tenant',
            'Service account or OAuth2 client for user lookup',
            'Group mapping for roles (e.g. student, enterprise, itpro)'
        ]
    })


@integrations_bp.route('/api/status', methods=['GET'])
def api_integration_status():
    """
    External API (AP) integration status.
    In production: use for progress sync, LMS integration, or third-party APIs.
    """
    return jsonify({
        'enabled': False,
        'message': 'API integration can be enabled for progress sync, LMS, or external systems.',
        'docs': 'Use REST API at /api/*; optionally set API_WEBHOOK_URL for outbound events.'
    })
